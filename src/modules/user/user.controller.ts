import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { formatResponse } from 'src/utils/index.utils';
import { Public } from 'src/decorators';
import { LoginUserDTO, RegisterUserDTO } from 'src/dtos/user.dto';

@Controller('user')
export class UserController {
  userService: UserService;

  constructor(_userService: UserService) {
    this.userService = _userService
  }

  @Public()
  @Post("register")
  register(@Body() params: RegisterUserDTO) {
    return formatResponse("Successfully registered user", {}, true);
  }

  @Public()
  @Post("login")
  login(@Body() params: LoginUserDTO) {
    return formatResponse("Successfully loggedIn user", {}, true);
  }

  @Get("profile")
  profile() {
    return formatResponse("Successfully fetched user profile", {}, true);
  }

}
