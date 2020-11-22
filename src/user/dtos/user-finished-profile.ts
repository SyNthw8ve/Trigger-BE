import { User } from "../schemas/user.schema";

import { InputType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CommunicateUserFinishedProfileDto {

    @Field(type => ID, { nullable: false })
    readonly id: User['_id'];

}