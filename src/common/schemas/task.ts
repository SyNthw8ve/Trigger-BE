import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
@Schema()
export class Task {

    @Field(type => String, { nullable: false })
    @Prop({ required: true })
    title: string;

    @Field(type => String, { nullable: false })
    @Prop({ required: true })
    description: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);