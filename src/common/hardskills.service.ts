import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHardskillDto } from './dtos/create-hardskill.dto';
import { Hardskill } from './schemas/hardskill.schema';

@Injectable()
export class HardskillsService {

    constructor(@InjectModel(Hardskill.name) private model: Model<Hardskill>) { }

    async new(createDto: CreateHardskillDto): Promise<Hardskill> {
        // TODO: validate this
        const hardSkill = new this.model(createDto);
        return hardSkill.save();
    }
}
