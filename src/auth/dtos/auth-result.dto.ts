import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Institution } from 'src/institution/schemas/institution.schema';
import { Project } from 'src/project/schemas/project.schema';
import { Hardskill } from 'src/hardskill/schemas/hardskill.schema';
import { UserSoftskill } from 'src/user/schemas/user.schema';
import { Language } from 'src/language/schemas/language.schema';
import { Availability } from 'src/common/schemas/availability.schema';
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