import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { formatResponse } from 'src/utils/index.utils';
import { CreatePostDTO, EditPostDTO } from 'src/dtos/post.dto';

@Controller('post')
export class PostController {

    postService: PostService;

    constructor(_postService: PostService) {
        this.postService = _postService
    }

    @Post("/create")
    createPost(@Body() params: CreatePostDTO) {
        return formatResponse("Successfully created post", {}, true);
    }

    @Put("/edit")
    editPost(@Body() params: EditPostDTO) {
        return formatResponse("Successfully editted post", {}, true);

    }

    @Delete("delete-post/:postId")
    deletePost(@Param("postId") postId: number) {
        return formatResponse("Successfully edited post", {}, true);
    }

    @Get("all-post")
    getAllPost() {
        return formatResponse("Posts fetched", {}, true);
    }

    @Get(":postSlug")
    getPost(@Param("postSlug") id: string) {
        return formatResponse("Post fetched", {}, true);
    }
}
