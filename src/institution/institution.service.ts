import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Institution } from './schemas/institution.schema';
import { CreateInstitutionDto } from './dtos/create-institution.dto';
import { Project } from 'src/project/schemas/project.schema';
import { LocationService } from 'src/common/location.service';

@Injectable()
export class InstitutionService {

    constructor(@InjectModel(Institution.name) private model: Model<Institution>,
        private locationService: LocationService) { }

    async new(createInstitutionDto: CreateInstitutionDto): Promise<Institution> {
        // TODO: validate this

        // TODO: How do we want to handle admins? Do we always add the manager to that list? A manager is always
        // gonna be an admin, right? If we want him there, something like below?
        // const objectWithManagerAsAdmin = Object.assign(createInstitutionDto, { admins: Institution['admins'] = [createInstitutionDto.manager] });

        const created = new this.model(createInstitutionDto);
        return created.save();
    }

    async addProject(institutionId: Institution['_id'], projectId: Project['_id']) {
        const institution = await this.model.findById(institutionId);
        institution.projects.push(projectId);

        await institution.save();
    }

    async getInstitutions() : Promise<Institution[]> {

        return await this.model.find();
    }

    async findWithId(institutionId: Institution['_id']) {
        
        try {

            return await this.model.findById(institutionId);
        }

        catch (err) {

            return null
        }
    }

}
