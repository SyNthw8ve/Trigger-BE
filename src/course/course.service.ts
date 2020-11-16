import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dtos/create-course.dto';
import { Course } from './schemas/course.schema';

@Injectable()
export class CourseService {

    constructor(@InjectModel(Course.name) private model: Model<Course>) { }

    async new(createDto: CreateCourseDto): Promise<Course> {
        // TODO: validate this
        const skill = new this.model(createDto);
        return skill.save();
    }

    async findWithId(id: Course['_id']): Promise<Course> {

        return await this.model.findById(id);
    }

    async findManyWithId(ids: Course['_id'][]): Promise<Course[]> {

        return await this.model.find({ _id: { $in: ids } });
    }

    async getAll(): Promise<Course[]> {

        return await this.model.find();
    }
}
