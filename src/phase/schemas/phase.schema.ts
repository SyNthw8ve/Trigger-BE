import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Participation } from 'src/participation/schemas/participation.schema';

import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Phase extends Document {

    @Field(type => GraphQLISODateTime, { nullable: false })
    @Prop({ required: true })
    startDate: Date;

    @Field(type => GraphQLISODateTime, { nullable: false })
    @Prop({ required: true })
    endDate: Date;

    @Field(type => [ID], { nullable: false })
    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Participation' }])
    participations: Participation['_id'][];
}

export const PhaseSchema = SchemaFactory.createForClass(Phase);