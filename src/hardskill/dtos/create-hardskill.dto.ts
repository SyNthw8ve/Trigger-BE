import { Hardskill } from "../schemas/hardskill.schema";
import { InputType , Field } from '@nestjs/graphql';

@InputType()
export class CreateHardskillDto {

    @Field(type => String, { nullable: false })
    name: Hardskill['name'];
}