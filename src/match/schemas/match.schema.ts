import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Opening } from 'src/opening/schemas/opening.schema';
import { Project } from 'src/project/schemas/project.schema';
import { User } from 'src/user/schemas/user.schema';

export enum MatchType {
    Opening = "opening",
    Project = "project"
}

@Schema()
export class Match extends Document {

    @Prop({ required: true })
    type: MatchType;

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
    user: User['_id'];

    @Prop({ type: SchemaTypes.ObjectId, required: true })
    matching: Project['_id'] | Opening['_id'];

    @Prop({ required: true })
    superMatch: boolean;

    @Prop({ required: true })
    score: number;
}

export const MatchSchema = SchemaFactory.createForClass(Match);