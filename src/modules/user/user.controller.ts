import { Body, ConflictException, Controller, Get, Request, NotFoundException, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { compareHash, formatResponse } from 'src/utils/index.utils';
import { Public } from 'src/decorators';
import { LoginUserDTO, RegisterUserDTO } from 'src/dtos/user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {



  constructor(private userService: UserService, private jwtService: JwtService) {

  }

  @Public()
  @Post("register")
  async register(@Body() params: RegisterUserDTO) {

    try {
      const { username, email, password } = params;
      let user = await this.userService.fetchUserByField({ username });
      if (user) {
        throw new ConflictException(`User with username ${username} already exists`);
      }
      user = await this.userService.fetchUserByField({ email });
      if (user) {
        throw new ConflictException(`User with email ${params.email} already exists`);
      }
      user = await this.userService.createUser(params);
      delete user.password;
      const token = await this.jwtService.signAsync({ id: user.id, username })
      return formatResponse("Successfully registered user", { user, token }, true);
    } catch (error) {
      return formatResponse(error.message, {}, false);
    }
  }

  @Public()
  @Post("login")
  async login(@Body() params: LoginUserDTO) {
    try {
      const { username, password } = params;
      const user = await this.userService.fetchUserByUsername(username);
      if (!user) {
        throw new NotFoundException("Invalid Login Detail");
      }
      const isPassword = compareHash(user.password, password);
      if (!isPassword) {
        throw new NotFoundException("Invalid Login Detail");
      }
      delete user.password;
      const token = await this.jwtService.signAsync({ id: user.id, username })
      return formatResponse("Login successful", { user, token }, true);
    } catch (error) {
      return formatResponse(error.message, {}, false);
    }
  }

  @Get("profile")
  async profile(@Request() req) {
    try {
      const { user } = req
      const userRecord = await this.userService.fetchUserByField({ id: user.id });
      return {
        message: "User fetched successfully.", data: {
          user: userRecord,
        }
      };
    } catch (error) {
      return formatResponse(error.message, {}, false);
    }
  }

}
