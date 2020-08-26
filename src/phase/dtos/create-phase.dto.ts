import { Opening } from "src/opening/schemas/opening.schema";
import { Phase } from "src/phase/schemas/phase.schema";
import { Project } from "src/project/schemas/project.schema";
import { Task } from "../../common/schemas/task";
import { TaskInput } from "../../common/dtos/task-input.dto";

import { ObjectType, InputType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class OpeningTasks {

    @Field(type => ID, { nullable: false })
    opening: Opening['_id'];

    @Field(type => [Task], { nullable: false })
    tasks: Task[];
}

@InputType()
export class OpeningTasksInput {

    @Field(type => ID, { nullable: false })
    opening: Opening['_id'];

    @Field(type => [TaskInput], { nullable: false })
    tasks: Task[];
}

@InputType()
export class CreatePhaseDto {

    @Field(type => ID, { nullable: false })
    project: Project['_id'];

    @Field(type => GraphQLISODateTime, { nullable: false })
    startDate: Phase['startDate'];

    @Field(type => GraphQLISODateTime, { nullable: false })
    endDate: Phase['endDate'];

    @Field(type => [OpeningTasksInput], { nullable: false })
    openingsAndTasks: OpeningTasks[];
}
