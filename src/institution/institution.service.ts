import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Institution } from './schemas/institution.schema';
import { CreateInstitutionDto } from './dtos/create-institution.dto';

@Injectable()
export class InstitutionService {

    constructor(@InjectModel(Institution.name) private userModel: Model<Institution>) { }

    async new(createInstitutionDto: CreateInstitutionDto): Promise<Institution> {
        // TODO: validate this

        // TODO: How do we want to handle admins? Do we always add the manager to that list? A manager is always
        // gonna be an admin, right? If we want him there, something like below?
        // const objectWithManagerAsAdmin = Object.assign(createInstitutionDto, { admins: Institution['admins'] = [createInstitutionDto.manager] });
        
        const created = new this.userModel(createInstitutionDto);
        return created.save();
    }

    // async update(updateUserDto: UpdateUserDto): Promise<void> {
    //     // TODO: validate this
    //     let { id, ...updateObj } = updateUserDto;
    //     await this.userModel.updateOne({ _id: id }, updateObj);
    // }

}
