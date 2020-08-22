import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dtos/create-User.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Project } from 'src/project/schemas/project.schema';
import { HardskillsService } from 'src/common/hardskills.service';
import { CreateHardskillDto } from 'src/common/dtos/create-hardskill.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>,
        private hardSkillsService: HardskillsService) { }

    async new(registerUserDto: RegisterUserDto): Promise<User> {
        // TODO: validate this
        // TODO: THERE ARE PASSWORDS HERE, THIS HAS NO SECURITY

        let { hardSkills: oldHardSkills, ...rest } = registerUserDto;

        // Because we may not have any
        if (!oldHardSkills) { oldHardSkills = []; }

        const finalHardSkills = await Promise.all(oldHardSkills.map(async value => {

            // FIXME: Ugly, essentially if it's a name, 
            // we have to add it to the hardskills we now of,
            // since this doesn't exist yet
            if (value.name) {
                return (await this.hardSkillsService.new(value))._id;
            } else {
                return value;
            }
        }));

        const createdUser = new this.userModel({ hardSkills: finalHardSkills, ...rest });
        return createdUser.save();
    }

    async update(updateUserDto: UpdateUserDto): Promise<void> {
        // TODO: validate this
        let { id, ...updateObj } = updateUserDto;
        await this.userModel.updateOne({ _id: id }, updateObj);
    }

    async addProject(managerId: User['_id'], projectId: Project['_id']) {
        const user = await this.userModel.findById(managerId);
        user.projects.push(projectId);
        user.save();
    }

}
