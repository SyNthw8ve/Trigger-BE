import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';

import { Field, ObjectType, ID, registerEnumType, Int } from '@nestjs/graphql';

export enum QuestionType {
    Evalulation,
    Potency,
    Activity,
}

registerEnumType(QuestionType, { name: 'QuestionType' });

@ObjectType()
@Schema()
class SoftSkillScale {

    @Field(type => Int, { nullable: false })
    @Prop({ type: Number, required: true })
    minValue: number;

    @Field(type => Int, { nullable: false })
    @Prop({ type: Number, required: true })
    maxValue: number;

    @Field(type => Int, { nullable: false })
    @Prop({ type: Number, required: true })
    step: number;

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    minValueDescription: String;

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    maxValueDescription: String;
}

@ObjectType()
@Schema()
export class SoftSkillQuestion extends Document {

    @Field(type => ID, { nullable: false })
    _id: Document['_id'];

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    question: string;

    @Field(type => QuestionType, { nullable: false })
    @Prop({ type: QuestionType, required: true })
    questionType: QuestionType;

    // TODO: What is this?
    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    questionGroup: String;

    @Field(type => SoftSkillScale, { nullable: false })
    @Prop({ type: SoftSkillScale, required: true })
    questionScale: SoftSkillScale;
}

export const SoftSkillQuestionSchema = SchemaFactory.createForClass(SoftSkillQuestion);