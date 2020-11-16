import { InputType, Field } from '@nestjs/graphql';
import { Course } from '../schemas/course.schema';

@InputType()
export class CreateCourseDto {

    @Field(type => String, { nullable: false })
    name: Course['name'];
}