import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';

import { ObjectType, Field, ID, Float, InputType, registerEnumType, GraphQLISODateTime } from '@nestjs/graphql';
import { Course } from 'src/course/schemas/course.schema';
import { Institution } from 'src/institution/schemas/institution.schema';
import { Locale, LocaleSchema } from 'src/common/schemas/locale.schema';
import { LocaleInput } from 'src/common/dtos/locale-input.dto';

@ObjectType()
@Schema()
export class UserExperience {

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    role: String;

    @Field(type => Locale, { nullable: false })
    @Prop({ type: LocaleSchema, required: true })
    location: Locale;

    @Field(type => ID, { nullable: true })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Institution', required: false })
    company?: Institution['_id'];

    @Field(type => GraphQLISODateTime, { nullable: false })
    @Prop({ type: Date, required: true })
    startDate: Date;

    @Field(type => GraphQLISODateTime, { nullable: true })
    @Prop({ type: Date, required: false })
    finishDate?: Date;
}

export const UserExperienceSchema = SchemaFactory.createForClass(UserExperience);

@InputType()
export class UserExperienceInput {

    @Field(type => String, { nullable: false })
    role: String;

    @Field(type => LocaleInput, { nullable: false })
    location: LocaleInput;

    @Field(type => ID, { nullable: true })
    company?: Institution['_id'];

    @Field(type => GraphQLISODateTime, { nullable: false })
    startDate: Date;

    @Field(type => GraphQLISODateTime, { nullable: true })
    finishDate?: Date;
}
