import { User } from "../schemas/user.schema";
import { AvailabilityInput } from "../../common/dtos/availability-input.dto";

import { InputType, Field, ID, GraphQLISODateTime, Int } from '@nestjs/graphql';
import { UserHardskillInput } from "../schemas/user-hardskill.schema";
import { UserLanguageInput } from "../schemas/user-language.schema";
import { UserLearningInput } from "../schemas/user-learning.schema";
import { UserExperienceInput } from "../schemas/user-experience.schema";

@InputType()
export class UpdateUserDto {

    @Field(type => ID, { nullable: false })
    readonly id: User['_id'];

    @Field(type => String, { nullable: true })
    readonly email?: User['email'];

    @Field(type => String, { nullable: true })
    readonly password?: User['password'];

    @Field(type => String, { nullable: true })
    readonly name?: User['name'];

    @Field(type => String, { nullable: true })
    readonly lastName?: User['lastName'];

    @Field(type => GraphQLISODateTime, { nullable: true })
    readonly dateOfBirth?: User['dateOfBirth'];

    @Field(type => String, { nullable: true })
    readonly city?: User['city'];

    @Field(type => String, { nullable: true })
    readonly country?: User['country'];

    @Field(type => ID, { nullable: true })
    readonly institution?: User['institution'];

    @Field(type => String, { nullable: true })
    readonly currentFunction?: User['currentFunction'];

    @Field(type => [UserExperienceInput], { nullable: true })
    readonly experience?: UserExperienceInput[];

    @Field(type => [UserLearningInput], { nullable: true })
    readonly learnings?: UserLearningInput[];

    @Field(type => [UserLanguageInput], { nullable: true })
    readonly languages?: UserLanguageInput[];

    @Field(type => [UserHardskillInput], { nullable: true })
    readonly hardSkills?: UserHardskillInput[];

    @Field(type => [String], { nullable: true })
    readonly interests?: User['interests'];

    @Field(type => AvailabilityInput, { nullable: true })
    readonly availability?: AvailabilityInput;

    @Field(type => [Int], { nullable: true })
    readonly softSkillQuizAnswers?: (number | null)[];
}