import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Course extends Document {
    @Field(() => ID)
    _id: Document['_id'];

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    name: String;
}

export const CourseSchema = SchemaFactory.createForClass(Course);