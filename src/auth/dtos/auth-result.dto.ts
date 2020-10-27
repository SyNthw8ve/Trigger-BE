import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/user/schemas/user.schema';

export enum Status {

    OK,
    INVALID_EMAIL,
    PASSWORD_NOT_MATCH
}

registerEnumType(Status, { name: 'Status' });

@ObjectType()
class Result {

    @Field(type => ID, { nullable: false })
    userId: User['_id'];
}

@ObjectType()
export class AuthResult {

    @Field(type => Result, { nullable: true })
    result: Result;

    @Field(type => Boolean, { nullable: false })
    success: boolean;

    @Field(type => Status, { nullable: false })
    status: Status;

    @Field(type => String, { nullable: true })
    accessToken: string;
}