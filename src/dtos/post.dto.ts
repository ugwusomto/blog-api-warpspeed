
import {   IsNotEmpty, IsNumber,  IsString } from "class-validator";



export class CreatePostDTO {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}


export class EditPostDTO {

    @IsNumber()
    @IsNotEmpty()
    postId: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}

export class GetAllPostDTO {

    @IsNumber()
    skip: number;

}

