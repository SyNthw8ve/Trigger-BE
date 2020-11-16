import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class LanguageLevel extends Document {

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    name: String;

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    description: String;
}

export const LanguageLevelSchema = SchemaFactory.createForClass(LanguageLevel);

@InputType()
export class LanguageLevelInput {

    @Field(type => String, { nullable: false })
    name: String;

    @Field(type => String, { nullable: false })
    description: String;
}

@ObjectType()
@Schema()
export class Language extends Document {

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    name: String;

    @Field(type => [LanguageLevel], { nullable: false })
    @Prop({ type: [LanguageLevelSchema], required: true })
    readingLevels: LanguageLevel[];

    @Field(type => [LanguageLevel], { nullable: false })
    @Prop({ type: [LanguageLevelSchema], required: true })
    understandingLevels: LanguageLevel[];

    @Field(type => [LanguageLevel], { nullable: false })
    @Prop({ type: [LanguageLevelSchema], required: true })
    speakingLevels: LanguageLevel[];

    @Field(type => [LanguageLevel], { nullable: false })
    @Prop({ type: [LanguageLevelSchema], required: true })
    writingLevels: LanguageLevel[];
}

export const LanguageSchema = SchemaFactory.createForClass(Language);