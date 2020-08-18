import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dtos/create-User.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async new(registerUserDto: RegisterUserDto): Promise<User> {
        // TODO: validate this
        // TODO: THERE ARE PASSWORDS HERE, THIS HAS NO SECURITY 
        const createdUser = new this.userModel(registerUserDto);
        return createdUser.save();
    }

    async update(updateUserDto: UpdateUserDto): Promise<void> {
        // TODO: validate this
        let { id, ...updateObj } = updateUserDto;
        await this.userModel.updateOne({ _id: id }, updateObj);
    }

}
