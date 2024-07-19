import { Injectable } from '@nestjs/common';
import { Post } from 'src/types';

@Injectable()
export class PostService {

    async fetchPostById():Promise<Post|null>{
        return null;
    }

    async createPost():Promise<Post|null>{
        return null;
    }

}
