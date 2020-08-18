import { User } from "src/user/schemas/user.schema";
import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Project extends Document {
    @Prop({ required: true })
    title: string;
    // photos
    @Prop({ required: true })
    description: string;
    @Prop({ required: true })
    scope: string;
    // location?
    // status <- What is this D:
    // recommendations
    // deadlines
    @Prop([{ type: SchemaTypes.ObjectId, ref: User.name }])
    currentTeam: User['_id'][];
    // openings
}

export const ProjectSchema = SchemaFactory.createForClass(Project);