import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Language extends Document {

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    name: String;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);