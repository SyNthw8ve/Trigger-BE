import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParticipationDto } from './dtos/participation.dto';
import { Participation } from './schemas/participation.schema';

@Injectable()
export class ParticipationService {

    constructor(@InjectModel(Participation.name) private model: Model<Participation>) { }

    async new(data: ParticipationDto): Promise<Participation> {
        // TODO: validate this
        const created = new this.model(data);
        return created.save();
    }

    async findManyWithId(ids: Participation['_id'][]): Promise<Participation[]> {

        return await this.model.find({ _id: { $in: ids } });
    }

}
