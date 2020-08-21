import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Availability } from 'src/common/dtos/availability.dto';
import { Locale } from 'src/common/dtos/locale.dto';
import { Match } from 'src/match/schemas/match.schema';
import { Participation } from 'src/participation/schemas/participation.schema';
import { Project } from 'src/project/schemas/project.schema';
import { User } from 'src/user/schemas/user.schema';

export enum ApplicationType {
    Manual = "spontaneous",
    Match = "match"
}

export class Application {
    @Prop({ required: true })
    type: ApplicationType;

    @Prop({ type: SchemaTypes.ObjectId, ref: Match.name, required: true })
    match?: Match['_id'];

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
    user: User['_id'];
}

@Schema()
export class Opening extends Document {
    @Prop({ required: true })
    area: string;

    @Prop({ required: true })
    remuneration: number;

    @Prop({ required: false })
    location?: Locale;

    // languages;

    // softskills;

    // hardskills;

    @Prop({ required: true })
    availability: Availability;

    @Prop([Application])
    applications: Application[];

    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Participation' }])
    participations: Participation['_id'][];

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Project', required: true })
    project: Project['_id'];
}

export const OpeningSchema = SchemaFactory.createForClass(Opening);