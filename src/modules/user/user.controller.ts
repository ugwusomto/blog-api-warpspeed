import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { formatResponse } from 'src/utils';

@Controller('user')
export class UserController {
  userService:UserService;

  constructor(_userService:UserService){
    this.userService = _userService
  }

  @Post("register")
  register(){
    return formatResponse("Successfully registered user",{},true);
  }

  @Post("login")
  login(){
    return formatResponse("Successfully loggedIn user",{},true);
  }

  @Get("profile")
  profile(){
    return formatResponse("Successfully fetched user profile",{},true);
  }

}
