import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Model } from 'mongoose';
import { Project } from 'src/project/schemas/project.schema';
import { CreateOpeningDto } from './dtos/create-opening.dto';
import { Opening } from './schemas/opening.schema';

@Injectable()
export class OpeningService {

    constructor(@InjectModel(Opening.name) private model: Model<Opening>) { }

    async new(createDto: CreateOpeningDto, project: Project['_id']): Promise<Opening> {
        // TODO: validate this
        
        let data = {
            project,
            ...createDto
        }

        const created = new this.model(data);

        return created.save();
    }

}
