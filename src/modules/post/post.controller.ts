import { Body, Controller, Delete, Get, Param, Post, Request, Put, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { formatResponse, sluggify } from 'src/utils/index.utils';
import { CreatePostDTO, EditPostDTO, GetAllPostDTO } from 'src/dtos/post.dto';
import { POST_STATUS } from 'src/config/index.enum';
import { Prisma } from '@prisma/client';

@Controller('post')
export class PostController {

    postService: PostService;

    constructor(_postService: PostService) {
        this.postService = _postService
    }

    @Post("create")
    async createPost(@Request() req, @Body() params: CreatePostDTO) {
        try {
            const { user } = req;
            const title = params.title.toLowerCase();
            const slug = sluggify(title);
            const newPost = {
                slug,
                title,
                content: params.content,
                status: POST_STATUS.PUBLISHED,
                creator: {
                    connect: { id: user.id },
                },
            }
            const post = await this.postService.createPost(newPost);
            return formatResponse("Successfully created post", { post }, true);
        } catch (error) {
            throw new HttpException(formatResponse(error.message, {}, false), HttpStatus.BAD_REQUEST);
        }
    }

    @Put("edit")
    async editPost(@Request() req, @Body() params: EditPostDTO) {
        try {
            const { user } = req;
            let post = await this.postService.fetchPostByField({ id: params.postId });
            if (!post) {
                throw new NotFoundException("Post not found");
            }
            const title = params.title.toLowerCase();
            const slug = sluggify(title);
            const editedPost = {
                slug,
                title,
                content: params.content,
                status: POST_STATUS.PUBLISHED
            }
            post = await this.postService.updatePost({ id: params.postId, creatorId: user.id }, editedPost);
            return formatResponse("Successfully edited post", { post }, true);
        } catch (error) {
            throw new HttpException(formatResponse(error.message, {}, false), HttpStatus.BAD_REQUEST);

        }
    }

    @Delete("delete-post/:postId")
    async deletePost(@Request() req, @Param("postId") postId: string) {
        try {
            const { user } = req;
            let post = await this.postService.fetchPostByField({ id: parseInt(postId), creatorId: user.id });
            if (!post) {
                throw new NotFoundException("Post not found");
            }
            post = await this.postService.deletePost(parseInt(postId));
            return formatResponse("Successfully deleted post", { post }, true);
        } catch (error) {
            throw new HttpException(formatResponse(error.message, {}, false), HttpStatus.BAD_REQUEST);

        }
    }

    @Post("all-post")
    async getAllPost(@Body() params: GetAllPostDTO) {
        try {
            let posts = await this.postService.fetchAllPost(params.skip);
            return formatResponse("Posts fetched", { posts }, true);
        } catch (error) {
            throw new HttpException(formatResponse(error.message, {}, false), HttpStatus.BAD_REQUEST);

        }
    }

    @Get(":slug")
    async getPost(@Param("slug") slug: string) {
        try {
            let post = await this.postService.fetchPostByField({ slug , status:POST_STATUS.PUBLISHED});
            if (!post) {
                throw new NotFoundException("Post not found");
            }
            return formatResponse("Post fetched", { post }, true);
        } catch (error) {
            throw new HttpException(formatResponse(error.message, {}, false), HttpStatus.BAD_REQUEST);

        }
    }
}
