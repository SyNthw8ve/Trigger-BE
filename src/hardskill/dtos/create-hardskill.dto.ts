import { Hardskill } from "../schemas/hardskill.schema";
import { ObjectType , Field } from '@nestjs/graphql';

@ObjectType()
export class CreateHardskillDto {

    @Field(type => String, { nullable: false })
    name: Hardskill['name'];
}