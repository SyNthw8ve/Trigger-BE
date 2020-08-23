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

import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';

export enum ApplicationType {
    Manual = "spontaneous",
    Match = "match"
}

registerEnumType(ApplicationType, { name: 'ApplicationType' });

@ObjectType()
export class Application {

    @Field(type => ApplicationType, { nullable: false })
    @Prop({ required: true })
    type: ApplicationType;

    @Field(type => ID, { nullable: true })
    @Prop({ type: SchemaTypes.ObjectId, ref: Match.name, required: true })
    match?: Match['_id'];

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
    user: User['_id'];
}

@ObjectType()
@Schema()
export class Opening extends Document {

    @Field(type => String, { nullable: false })
    @Prop({ required: true })
    area: string;

    @Field(type => Float, { nullable: false })
    @Prop({ required: true })
    remuneration: number;

    @Field(type => Locale, { nullable: true })
    @Prop({ type: LocaleSchema, required: false })
    location?: Locale;

    @Field(type => [ID])
    @Prop([{ type: SchemaTypes.ObjectId, ref: Language.name }])
    languages: Language['_id'][];

    @Field(type => [ID])
    @Prop([{ type: SchemaTypes.ObjectId, ref: Softskill.name }])
    softskills: Softskill['_id'][];

    @Field(type => [ID])
    @Prop([{ type: SchemaTypes.ObjectId, ref: Hardskill.name }])
    hardskills: Hardskill['_id'][];

    @Field(type => Availability, { nullable: false })
    @Prop({ type: AvailabilitySchema, required: true })
    availability: Availability;

    @Field(type => [Application])
    @Prop([Application])
    applications: Application[];

    @Field(type => [ID])
    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Participation' }])
    participations: Participation['_id'][];

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Project', required: true })
    project: Project['_id'];
}

export const OpeningSchema = SchemaFactory.createForClass(Opening);