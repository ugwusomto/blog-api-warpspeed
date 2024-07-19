import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { formatResponse } from 'src/utils';
import { Public } from 'src/decorators';

@Controller('user')
export class UserController {
  userService:UserService;

  constructor(_userService:UserService){
    this.userService = _userService
  }

  @Public()
  @Post("register")
  register(){
    return formatResponse("Successfully registered user",{},true);
  }

  @Public()
  @Post("login")
  login(){
    return formatResponse("Successfully loggedIn user",{},true);
  }

  @Get("profile")
  profile(){
    return formatResponse("Successfully fetched user profile",{},true);
  }

}
