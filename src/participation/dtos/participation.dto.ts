import { Participation } from "../schemas/participation.schema";
import { Task } from "../../common/schemas/task";

import { InputType, Field, ID} from '@nestjs/graphql';

@InputType()
export class ParticipationDto {

    @Field(type => ID, { nullable: false })
    opening: Participation['opening'];

    @Field(type => ID, { nullable: false })
    phase: Participation['phase'];

    @Field(type => [Task], { nullable: false })
    tasks: Participation['tasks'];
}