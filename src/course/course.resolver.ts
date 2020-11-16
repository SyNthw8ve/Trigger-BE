import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { Course } from './schemas/course.schema';

@Resolver(of => Course)
export class CourseResolver {

    constructor(private readonly courseService: CourseService) { }

    @Query(returns => [Course])
    async getCourses(): Promise<Course[]> {

        return await this.courseService.getAll();
    }

    @Mutation(returns => Course)
    async newCourse(@Args('course') course: CreateCourseDto): Promise<Course> {

        return await this.courseService.new(course);
    }

}
