import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class TaskInput {

    @Field(type => String, { nullable: false })
    title: string;

    @Field(type => String, { nullable: false })
    description: string;
}