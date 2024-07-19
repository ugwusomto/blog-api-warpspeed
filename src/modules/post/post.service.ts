import { Injectable } from '@nestjs/common';
import { Post } from 'src/types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {

    constructor(private prisma:PrismaService){}


    async fetchPostById():Promise<Post|null>{
        return null;
    }

    async createPost():Promise<Post|null>{
        return null;
    }

}
