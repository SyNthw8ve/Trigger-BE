import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Hardskill extends Document {

    @Field(() => ID)
    _id: Document['_id'];

    @Field(type => String, { nullable: false })
    @Prop({ required: true })
    name: String;
}

export const HardskillSchema = SchemaFactory.createForClass(Hardskill);