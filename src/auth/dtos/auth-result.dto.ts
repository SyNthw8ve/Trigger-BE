import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Institution } from 'src/institution/schemas/institution.schema';
import { Project } from 'src/project/schemas/project.schema';
import { Hardskill } from 'src/hardskill/schemas/hardskill.schema';
import { UserSoftskill } from 'src/user/schemas/user.schema';
import { Language } from 'src/language/schemas/language.schema';
import { Availability } from 'src/common/schemas/availability.schema';

export enum Status {

    OK,
    INVALID_EMAIL,
    PASSWORD_NOT_MATCH
}

registerEnumType(Status, { name: 'Status' });

@ObjectType()
class Result {

    @Field(type => String, { nullable: false })
    name: string;

    @Field(type => String, { nullable: false })
    email: string;

    @Field(type => ID, { nullable: true })
    institution?: Institution['_id'];

    @Field(type => [String])
    interests: String[];

    @Field(type => [ID])
    projects: Project['_id'][];

    @Field(type => [ID])
    hardSkills: Hardskill['_id'][];

    @Field(type => [UserSoftskill])
    softSkills: UserSoftskill[];

    @Field(type => [ID])
    languages: Language['_id'][];

    @Field(type => Availability, { nullable: true })
    availability?: Availability;
}

@ObjectType()
export class AuthResult {

    @Field(type => Result, { nullable: true })
    result: Result;

    @Field(type => Boolean, { nullable: false })
    success: boolean;

    @Field(type => Status, { nullable: false })
    status: Status;
}