import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dto/create-User.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async new(registerUserDto: RegisterUserDto): Promise<User> {
        const createdCat = new this.userModel(registerUserDto);
        return createdCat.save();
    }

}
