import { Softskill } from "../schemas/softskill.schema";

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSoftskillDto {

    @Field(type => String, { nullable: false })
    name: Softskill['name'];
}