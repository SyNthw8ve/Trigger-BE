import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Softskill extends Document {
    @Field(() => ID)
    readonly _id: string;

    @Field(type => String, { nullable: false })
    @Prop({ required: true })
    name: String;
}

export const SoftskillSchema = SchemaFactory.createForClass(Softskill);