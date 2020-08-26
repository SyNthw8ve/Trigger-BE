import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dtos/create-User.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Project } from 'src/project/schemas/project.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async new(registerUserDto: RegisterUserDto): Promise<User> {
        // TODO: validate this
        // TODO: THERE ARE PASSWORDS HERE, THIS HAS NO SECURITY
        try {

            const createdUser = new this.userModel(registerUserDto);
            return await createdUser.save();
        }

        catch (err) {

            if (err.code == 11000) console.log("Duplicate email");
        }
        
    }

    async update(updateUserDto: UpdateUserDto): Promise<User> {
        // TODO: validate this
        let { id, ...updateObj } = updateUserDto;
        return await this.userModel.findByIdAndUpdate({ _id: id }, updateObj, { useFindAndModify: false });
    }

    async addProject(managerId: User['_id'], projectId: Project['_id']) {
        const user = await this.userModel.findById(managerId);
        user.projects.push(projectId);
        user.save();
    }

    async getUsers() : Promise<User[]> {

        return await this.userModel.find();
    }

    async findWithId(id: User['_id']) : Promise<User> {

        return await this.userModel.findById(id);
    }

    async findWithEmail(email: string) : Promise<User> {

        try {

            return await this.userModel.findOne({'email': email}).exec();

        } catch(err) {

            return null;
        }

    }

    async findManyWithId(ids: User['_id'][]) : Promise<User[]> {

        return await this.userModel.find({ _id: { $in: ids }});
    }

}
