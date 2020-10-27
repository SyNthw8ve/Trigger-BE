import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';

import { ObjectType, Field, ID, Float, InputType } from '@nestjs/graphql';
import { Language } from 'src/language/schemas/language.schema';

@ObjectType()
@Schema()
export class UserLanguage {

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: Language.name, required: true })
    languageId: Language['_id'];

    @Field(type => Float, { nullable: false })
    @Prop({ type: Number, required: true })
    score: number;
}

export const UserLanguageSchema = SchemaFactory.createForClass(UserLanguage);

@InputType()
export class UserLanguageInput {

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: Language.name, required: true })
    languageId: Language['_id'];

    @Field(type => Float, { nullable: false })
    @Prop({ type: Number, required: true })
    score: number;
}
