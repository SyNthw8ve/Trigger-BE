import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Availability, AvailabilitySchema } from 'src/common/schemas/availability.schema';
import { Locale, LocaleSchema } from 'src/common/schemas/locale.schema';
import { Hardskill, HardskillSchema } from 'src/hardskill/schemas/hardskill.schema';
import { Language, LanguageSchema } from 'src/language/schemas/language.schema';
import { Match } from 'src/match/schemas/match.schema';
import { Participation } from 'src/participation/schemas/participation.schema';
import { Project } from 'src/project/schemas/project.schema';
import { Softskill, SoftskillSchema } from 'src/softskill/schemas/softskill.schema';
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

    @Prop({ type: LocaleSchema, required: false })
    location?: Locale;

    @Prop([{ type: SchemaTypes.ObjectId, ref: Language.name }])
    languages: Language['_id'][];

    @Prop([{ type: SchemaTypes.ObjectId, ref: Softskill.name }])
    softskills: Softskill['_id'][];

    @Prop([{ type: SchemaTypes.ObjectId, ref: Hardskill.name }])
    hardskills: Hardskill['_id'][];

    @Prop({ type: AvailabilitySchema, required: true })
    availability: Availability;

    @Prop([Application])
    applications: Application[];

    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Participation' }])
    participations: Participation['_id'][];

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Project', required: true })
    project: Project['_id'];
}

export const OpeningSchema = SchemaFactory.createForClass(Opening);