import { User, UserSoftskillInput } from "../schemas/user.schema";
import { AvailabilityInput } from "../../common/dtos/availability-input.dto";

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

    @Field(type => [UserSoftskillInput], { nullable: true })
    readonly softSkills?: User['softSkills'];

    @Field(type => [ID], { nullable: true })
    readonly languages?: User['languages'];

    @Field(type => AvailabilityInput, { nullable: true })
    readonly availability?: User['availability'];

    @Field(type => [String], { nullable: true })
    readonly interests?: User['interests'];
}