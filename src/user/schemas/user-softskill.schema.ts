import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Softskill } from "src/softskill/schemas/softskill.schema";

import { ObjectType, Field, ID, Int, InputType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class UserSoftskill {

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: Softskill.name, required: true })
    softskillId: Softskill['_id'];

    @Field(type => Int, { nullable: false })
    @Prop({ type: Number, required: true })
    score: number;

    @Field(type => Boolean, { nullable: false })
    @Prop({ type: Boolean, required: true })
    visible: boolean;
}

export const UserSoftskillSchema = SchemaFactory.createForClass(UserSoftskill);

@InputType()
export class UserSoftskillInput {

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: Softskill.name, required: true })
    softskillId: Softskill['_id'];

    @Field(type => Int, { nullable: false })
    @Prop({ type: Number, required: true })
    score: number;

    @Field(type => Boolean, { nullable: false })
    @Prop({ type: Boolean, required: true })
    visible: boolean;
}
