
import {  IsEmail, IsLowercase, IsNotEmpty, IsNumber, IsOptional, IsString,  MaxLength, MinLength } from "class-validator";

export class RegisterUserDTO {

    @IsString()
    @IsLowercase()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsLowercase()
    @IsNotEmpty()
    @IsEmail()
    email: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

}


export class LoginUserDTO {

    @IsString()
    @IsLowercase()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

}