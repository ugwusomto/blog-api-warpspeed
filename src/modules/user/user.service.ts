import { Injectable } from '@nestjs/common';
import { User } from 'src/types';
import { PrismaService } from '../prisma/prisma.service';



@Injectable()
export class UserService {

    constructor(private prisma:PrismaService){}

    async fetchUserByEmail():Promise<User|null>{
        return null;
    }

    async createUser():Promise<User|null>{
        return null;
    }

}
