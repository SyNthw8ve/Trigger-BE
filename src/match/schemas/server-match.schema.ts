import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Opening } from 'src/opening/schemas/opening.schema';
import { User } from 'src/user/schemas/user.schema';

import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class ServerMatch extends Document {

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    user_id: User['_id'];

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Opening', required: true })
    opening_id: Opening['_id'];

    @Field(type => Float, { nullable: false })
    @Prop({ type: Number, required: true })
    similarity_score: number;

    @Field(type => Float, { nullable: false })
    @Prop({ type: Number, required: true })
    quality_score: number;

    @Field(type => Float, { nullable: false })
    @Prop({ type: Number, required: true })
    final_score: number;
}

export const ServerMatchSchema = SchemaFactory.createForClass(ServerMatch);