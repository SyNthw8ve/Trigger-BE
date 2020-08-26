import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Token {

    @Field(type => String, { nullable: false })
    accessToken: string;
}