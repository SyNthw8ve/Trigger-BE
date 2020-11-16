import { Hardskill, HardskillSchema } from "src/hardskill/schemas/hardskill.schema";

import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Institution } from "src/institution/schemas/institution.schema";
import { Project } from "src/project/schemas/project.schema";
import { Softskill } from "src/softskill/schemas/softskill.schema";
import { Language } from "src/language/schemas/language.schema";
import { Availability, AvailabilitySchema } from "src/common/schemas/availability.schema";

import { ObjectType, Field, ID, Float, InputType } from '@nestjs/graphql';
import { UserSoftskillSchema, UserSoftskill } from "./user-softskill.schema";
import { UserHardskill, UserHardskillSchema } from "./user-hardskill.schema";
import { UserLanguage, UserLanguageSchema } from "./user-language.schema";
import { UserLearning, UserLearningSchema } from "./user-learning.schema";

@ObjectType()
@Schema()
export class User extends Document {

    @Field(type => ID, { nullable: false })
    _id: Document['_id'];

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    name: string;

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    password: string;
    // photo

    @Field(type => ID, { nullable: true })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Institution' })
    institution?: Institution['_id'];

    @Field(type => [String])
    @Prop([String])
    interests: String[];

    @Field(type => [ID])
    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Project' }])
    projects: Project['_id'][];

    @Field(type => [UserHardskill])
    @Prop([{ type: UserHardskillSchema }])
    hardSkills: UserHardskill[];

    @Field(type => [UserSoftskill])
    @Prop([{ type: UserSoftskillSchema }])
    softSkills: UserSoftskill[];

    @Field(type => [UserLanguage])
    @Prop([{ type: UserLanguageSchema }])
    languages: UserLanguage[];

    @Field(type => [UserLearning])
    @Prop([{ type: UserLearningSchema }])
    learnings: UserLearning[];

    @Field(type => Availability, { nullable: true })
    @Prop({ type: AvailabilitySchema, required: false })
    availability?: Availability;

    // friends: User[]; // not yet
    // favorites: (User | number)[];
    // location
    // recommendations
}

export const UserSchema = SchemaFactory.createForClass(User);