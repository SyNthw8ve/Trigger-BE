import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';

import { ObjectType, Field, ID, Float, InputType } from '@nestjs/graphql';
import { Hardskill } from 'src/hardskill/schemas/hardskill.schema';

@ObjectType()
@Schema()
export class UserHardskill {

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: Hardskill.name, required: true })
    hardskillId: Hardskill['_id'];

    @Field(type => Float, { nullable: false })
    @Prop({ type: Number, required: true })
    score: number;
}

export const UserHardskillSchema = SchemaFactory.createForClass(UserHardskill);

@InputType()
export class UserHardskillInput {

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: Hardskill.name, required: true })
    hardskillId: Hardskill['_id'];

    @Field(type => Float, { nullable: false })
    @Prop({ type: Number, required: true })
    score: number;
}
