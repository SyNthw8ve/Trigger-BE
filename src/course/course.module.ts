import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseResolver } from './course.resolver';
import { CourseService } from './course.service';
import { Course, CourseSchema } from './schemas/course.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }])],
    providers: [CourseService, CourseResolver],
    exports: [CourseService]
})
export class CourseModule { }
