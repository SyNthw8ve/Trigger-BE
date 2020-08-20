import { User } from "src/user/schemas/user.schema";
import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Institution } from "src/institution/schemas/institution.schema";
import { Locale } from "src/common/dtos/locale.dto";
import { Phase } from "src/phase/schemas/phase.schema";

export enum ProjectStatus {
    Open = "open",
    Closed = "closed",
}

@Schema()
export class Project extends Document {
    @Prop({ required: true })
    title: string;

    @Prop([String])
    aliases: string[];

    // photos
    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    scope: string;

    @Prop({ required: false })
    location?: Locale;

    @Prop({ required: true })
    status: ProjectStatus;
    // recommendations
    // deadlines
    @Prop([{ type: SchemaTypes.ObjectId, ref: User.name }])
    currentTeam: User['_id'][];

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    manager: User['_id'];

    @Prop([{ type: SchemaTypes.ObjectId, ref: User.name }])
    admins: User['_id'][];

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Institution', required: false })
    institution?: Institution['id'];
    // openings

    @Prop({ required: true, default: false })
    highlighted: boolean;

    @Prop([{ type: SchemaTypes.ObjectId, ref: Phase.name }])
    phases: Phase['_id'][];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);