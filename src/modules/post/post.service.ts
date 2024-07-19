import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Prisma } from '@prisma/client';
import { FetchAllPostFilter } from 'src/config/index.types';
import { POST_STATUS } from 'src/config/index.enum';



@Injectable()
export class PostService {

    constructor(private prisma: PrismaService) { }


    async fetchAllPost(skip: number = 0): Promise<Post[] | null> {
        const result = this.prisma.post.findMany({ skip, take: 30, orderBy: { id: "desc" },where:{status:POST_STATUS.PUBLISHED} });
        return result;
    }

    async fetchPostByField(fields: Partial<Post>): Promise<Post | null> {
        const result = this.prisma.post.findFirst({
            where: { ...fields },
        });
        return result;
    }


    async createPost(data: Prisma.PostCreateInput): Promise<Post | null> {
        const result = this.prisma.post.create({
            data
        });
        return result;
    }

    async updatePost(where: Prisma.PostWhereUniqueInput, data: Prisma.PostUpdateInput
    ): Promise<Post | null> {
        const result = this.prisma.post.update({
            data,
            where,
        });
        return result;
    }

    async deletePost(id: number): Promise<Post> {
        const result = this.prisma.post.delete({
            where: { id },
        });
        return result;
    }

}
