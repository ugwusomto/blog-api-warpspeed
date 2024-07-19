import { Injectable } from '@nestjs/common';
import { User } from 'src/types';



@Injectable()
export class UserService {
    async fetchUserByEmail():Promise<User|null>{
        return null;
    }

    async createUser():Promise<User|null>{
        return null;
    }

}
