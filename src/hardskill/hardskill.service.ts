import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHardskillDto } from './dtos/create-hardskill.dto';
import { Hardskill } from './schemas/hardskill.schema';

@Injectable()
export class HardskillService {

    constructor(@InjectModel(Hardskill.name) private model: Model<Hardskill>) { }

    async many_new(registerHardSkills: CreateHardskillDto[]): Promise<Hardskill[]> {
        return Promise.all(
            registerHardSkills.map(value => this.new(value))
        );
    }

    async new(createDto: CreateHardskillDto): Promise<Hardskill> {
        // TODO: validate this
        const hardSkill = new this.model(createDto);
        return hardSkill.save();
    }

    async find_all(): Promise<Hardskill[]> {

        return this.model.find();
    }

    async findManyById(ids: Hardskill['_id'][]): Promise<Hardskill[]> {

        return await this.model.find({ _id: { $in: ids } });
    }

    async findWithId(id: Hardskill['_id']): Promise<Hardskill> {
        return await this.model.findById(id);
    }
}
