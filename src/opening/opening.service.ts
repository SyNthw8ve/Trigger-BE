import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Model } from 'mongoose';
import { Participation } from 'src/participation/schemas/participation.schema';
import { CreateOpeningDto } from './dtos/create-opening.dto';
import { Opening } from './schemas/opening.schema';

@Injectable()
export class OpeningService {

    constructor(@InjectModel(Opening.name) private model: Model<Opening>) { }

    async new(createDto: CreateOpeningDto): Promise<Opening> {
        // TODO: validate this
        const created = new this.model(createDto);

        return created.save();
    }

    async addParticipation(openingId: Opening['_id'], participationId: Participation['_id']) {
        const opening = await this.model.findById(openingId);
        opening.save();
    }

}
