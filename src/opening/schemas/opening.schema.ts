import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Availability } from 'src/common/dtos/availability.dto';
import { Locale } from 'src/common/dtos/locale.dto';
import { Project } from 'src/project/schemas/project.schema';
import { User } from 'src/user/schemas/user.schema';


export class Task {
    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ required: true })
    description: string;
}

export enum ApplicationType {
    Manual = "spontaneous",
    Match = "match"
}

export class Application {
    @Prop({ required: true })
    type: ApplicationType;

    // @Prop({ required: false })
    // match?: Match['_id'];

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
    user: User['_id'];
}

@Schema()
export class Opening extends Document {
    @Prop([Task])
    tasks: Task[]

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

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Project', required: true })
    project: Project['_id'];
}

export const OpeningSchema = SchemaFactory.createForClass(Opening);