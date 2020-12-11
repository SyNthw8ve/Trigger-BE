import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Opening } from './opening.schema';

// This is calculated by BE-AI, and is only temporary.
// We will process these objects and add them to the opening
@ObjectType()
export class ApplyScore extends Document {
    @Field(() => ID, { nullable: false })
    _id: Document['_id'];

    @Field(() => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    user_id: User['_id'];

    @Field(() => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Opening', required: true })
    opening_id: Opening['_id'];

    @Field(() => ID, { nullable: false })
    @Prop({ type: Number, required: true })
    score: number;
}

export const ApplyScoreSchema = SchemaFactory.createForClass(ApplyScore);