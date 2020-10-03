import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Opening } from 'src/opening/schemas/opening.schema';
import { Project } from 'src/project/schemas/project.schema';
import { User } from 'src/user/schemas/user.schema';

import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';

export enum MatchType {
    Opening = "opening",
    Project = "project"
}

registerEnumType(MatchType, { name: 'MatchType' })

@ObjectType()
@Schema()
export class Match extends Document {

    @Field(type => MatchType, { nullable: false })
    @Prop({ type: MatchType, required: true })
    type: MatchType;

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    user: User['_id'];

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, required: true })
    matching: Project['_id'] | Opening['_id'];

    @Field(type => Boolean, { nullable: false })
    @Prop({ type: Boolean, required: true })
    superMatch: boolean;

    @Field(type => Float, { nullable: false })
    @Prop({type: Number, required: true })
    score: number;
}

export const MatchSchema = SchemaFactory.createForClass(Match);