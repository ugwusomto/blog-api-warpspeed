import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { formatResponse } from 'src/utils';

@Controller('post')
export class PostController {

    postService:PostService;

    constructor(_postService:PostService){
      this.postService = _postService
    }
  
    @Post("/create")
    createPost(){
        return formatResponse("Successfully created post",{},true);
    }
  
    @Post("/edit")
    editPost(){
        return formatResponse("Successfully editted post",{},true);
  
    }

    @Delete("delete-post")
    deletePost(){
        return formatResponse("Successfully edited post",{},true);
    }
  
    @Get("all-post")
    getAllPost(){
        return formatResponse("Posts fetched",{},true);
    }

    @Get(":id")
    getPost(@Param("id") id:string){
        return formatResponse("Post fetched",{},true);
    }
}
