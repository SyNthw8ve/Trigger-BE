import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { DraftProject } from './schemas/draft-project.schema';
import { DraftProjectDto } from './dtos/draft-project.dto';

@Injectable()
export class DraftProjectService {

    constructor(@InjectModel(DraftProject.name) private projectModel: Model<DraftProject>) { }

    async new(draftProjectDto: DraftProjectDto) {
        return new this.projectModel(draftProjectDto).save();
    }

    async findWithId(id: Project['_id']): Promise<DraftProject> {

        return this.projectModel.findById(id);
    }

    async findManyWithId(ids: Project['_id'][]): Promise<DraftProject[]> {

        return await this.projectModel.find({ _id: { $in: ids } });
    }
}
