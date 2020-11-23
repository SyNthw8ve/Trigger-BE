import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Institution } from "src/institution/schemas/institution.schema";
import { Project } from "src/project/schemas/project.schema";
import { Availability, AvailabilitySchema } from "src/common/schemas/availability.schema";

import { ObjectType, Field, ID, GraphQLISODateTime, createUnionType, Union, registerEnumType, Int } from '@nestjs/graphql';
import { UserSoftskillSchema, UserSoftskill } from "./user-softskill.schema";
import { UserHardskill, UserHardskillSchema } from "./user-hardskill.schema";
import { UserLanguage, UserLanguageSchema } from "./user-language.schema";
import { UserLearning, UserLearningSchema } from "./user-learning.schema";
import { UserExperience, UserExperienceSchema } from "./user-experience.schema";
import { ConfirmationType } from '../dtos/confirmation-user-request.dto';
import { SoftSkillQuestion } from 'src/soft-quiz/schemas/soft-quiz.schema';

export enum RegistrationStep {

    None,
    RequestedConfirmation,
    DidConfirmation,
    DidProfile,
    DidSoftSkills,
}

registerEnumType(RegistrationStep, { name: 'RegistrationStep' });

@ObjectType()
@Schema()
export class ConfirmationData {

    @Field(type => ConfirmationType, { nullable: false })
    @Prop({ type: ConfirmationType, required: true })
    requestType: ConfirmationType;

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: false })
    phoneNumber?: string;

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    correctCode: string;

    @Field(type => Boolean, { nullable: false })
    @Prop({ type: Boolean, required: false, default: false })
    confirmed: boolean;
}

export const ConfirmationDataSchema = SchemaFactory.createForClass(ConfirmationData);

@ObjectType()
@Schema()
export class User extends Document {

    @Field(type => ID, { nullable: false })
    _id: Document['_id'];

    @Field(type => RegistrationStep, { nullable: false })
    @Prop({ type: RegistrationStep, required: true })
    registrationStep: RegistrationStep;

    @Field(type => ConfirmationData, { nullable: true })
    @Prop({ type: ConfirmationDataSchema, required: false })
    confirmationData?: ConfirmationData;

    @Field(type => [Int], { nullable: 'itemsAndList' })
    @Prop([{ type: Number, required: false }])
    softSkillQuizAnswers?: (number | null)[];

    @Field(type => [ID], { nullable: 'itemsAndList' })
    @Prop([{ type: SchemaTypes.ObjectId, ref: SoftSkillQuestion.name, required: false }])
    softSkillQuizQuestions?: SoftSkillQuestion['_id'][];

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: false })
    name?: string;

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: false })
    lastName?: string;

    @Field(type => GraphQLISODateTime, { nullable: true })
    @Prop({ type: Date, required: false })
    dateOfBirth?: Date;

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: false })
    city?: string;

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: false })
    country?: string;

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    password: string;

    // photo

    @Field(type => ID, { nullable: true })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Institution', required: false })
    institution?: Institution['_id'];

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: false })
    currentFunction?: string;

    @Field(type => [String], { nullable: true })
    @Prop([{ type: String, required: false }])
    interests?: String[];

    @Field(type => [ID], { nullable: true })
    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Project', required: false }])
    projects?: Project['_id'][];

    @Field(type => [UserHardskill], { nullable: true })
    @Prop([{ type: UserHardskillSchema, required: false }])
    hardSkills?: UserHardskill[];

    @Field(type => [UserSoftskill], { nullable: true })
    @Prop([{ type: UserSoftskillSchema, required: false }])
    softSkills?: UserSoftskill[];

    @Field(type => [UserLanguage], { nullable: true })
    @Prop([{ type: UserLanguageSchema, required: false }])
    languages?: UserLanguage[];

    @Field(type => [UserLearning], { nullable: true })
    @Prop([{ type: UserLearningSchema, required: false }])
    learnings?: UserLearning[];

    @Field(type => [UserExperience], { nullable: true })
    @Prop([{ type: UserExperienceSchema, required: false }])
    experience?: UserExperience[];

    @Field(type => Availability, { nullable: true })
    @Prop({ type: AvailabilitySchema, required: false })
    availability?: Availability;

    // friends: User[]; // not yet
    // favorites: (User | number)[];
    // location
    // recommendations
}

export const UserSchema = SchemaFactory.createForClass(User);