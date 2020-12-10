import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLanguageDto } from './dtos/create-language.dto';
import { Language } from './schemas/language.schema';

@Injectable()
export class LanguageService {

    constructor(@InjectModel(Language.name) private model: Model<Language>) { }

    async new(createDto: CreateLanguageDto): Promise<Language> {
        const language = new this.model(createDto);
        return language.save();
    }

    async findManyById(ids: Language['_id'][]) : Promise<Language[]> {

        return await this.model.find({ _id: { $in: ids } });
    }

    async getAll() : Promise<Language[]> {

        return await this.model.find();
    }

    async findWithId(id: Language['_id']): Promise<Language> {
        return await this.model.findById(id);
    }
}
