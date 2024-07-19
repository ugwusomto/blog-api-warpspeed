import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { hash } from 'src/utils/index.utils';


@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }


    async fetchUserByField(fields: Partial<User>): Promise<User | null> {
        const result = this.prisma.user.findFirst({
            where: { ...fields },
        });
        return result;
    }

    async fetchUserByUsername(username: string): Promise<User | null> {
        const result = this.prisma.user.findFirst({
            where: { username },
        });
        return result;
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User | null> {
        data.password = await hash(data.password);
        const result = this.prisma.user.create({
            data,
        });
        return result;
    }

}
