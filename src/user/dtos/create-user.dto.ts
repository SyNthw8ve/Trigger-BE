import { User } from "../schemas/user.schema";
import { Availability } from "../../common/schemas/availability.schema";

import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class RegisterUserDto {

    @Field(type => String, { nullable: false })
    readonly name: User['name'];

    @Field(type => String, { nullable: false })
    readonly email: User['email'];

    @Field(type => String, { nullable: false })
    readonly password: User['password'];

    @Field(type => [ID], { nullable: true })
    readonly hardSkills?: User['hardSkills'];

    @Field(type => [ID], { nullable: true })
    readonly softSkills?: User['softSkills'];

    @Field(type => [ID], { nullable: true })
    readonly languages?: User['languages'];

    @Field(type => Availability, { nullable: true })
    readonly availability?: User['availability'];

    @Field(type => [String], { nullable: true })
    readonly interests?: User['interests'];
}