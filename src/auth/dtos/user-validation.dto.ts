import { ObjectType, InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserValidation {

    @Field(type => String, { nullable: false })
    email: string

    @Field(type => String, { nullable: false })
    password: string
}