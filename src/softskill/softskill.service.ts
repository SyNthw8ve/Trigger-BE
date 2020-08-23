import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSoftskillDto } from './dtos/create-softskill.dto';
import { Softskill } from './schemas/softskill.schema';

@Injectable()
export class SoftskillService {

    constructor(@InjectModel(Softskill.name) private model: Model<Softskill>) { }

    async new(createDto: CreateSoftskillDto): Promise<Softskill> {
        // TODO: validate this
        const skill = new this.model(createDto);
        return skill.save();
    }
}
