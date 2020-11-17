import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';

import { ObjectType, Field, ID, Float, InputType } from '@nestjs/graphql';
import { Language, LanguageLevel } from 'src/language/schemas/language.schema';

@ObjectType()
@Schema()
export class UserLanguage {

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: Language.name, required: true })
    languageId: Language['_id'];

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    readingLevel: LanguageLevel['name'];

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    understandingLevel: LanguageLevel['name'];

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    speakingLevel: LanguageLevel['name'];

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    writingLevel: LanguageLevel['name'];
}

export const UserLanguageSchema = SchemaFactory.createForClass(UserLanguage);

@InputType()
export class UserLanguageInput {

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: Language.name, required: true })
    languageId: Language['_id'];

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    readingLevel: LanguageLevel['name'];

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    understandingLevel: LanguageLevel['name'];

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    speakingLevel: LanguageLevel['name'];

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    writingLevel: LanguageLevel['name'];
}
