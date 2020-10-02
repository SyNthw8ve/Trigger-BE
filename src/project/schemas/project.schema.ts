import { User } from "src/user/schemas/user.schema";
import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Institution } from "src/institution/schemas/institution.schema";
import { Locale, LocaleSchema } from "src/common/schemas/locale.schema";
import { Phase } from "src/phase/schemas/phase.schema";

import { Field, ObjectType, ID, registerEnumType, GraphQLISODateTime } from '@nestjs/graphql';

export enum ProjectStatus {
    Open = "open",
    Closed = "closed",
}

registerEnumType(ProjectStatus, { name: 'ProjectStatus' });

@ObjectType()
@Schema()
export class Project extends Document {

    @Field(type => ID, { nullable: false })
    _id: Document['_id'];

    @Field(type => String, { nullable: false })
    @Prop({ required: true })
    title: string;

    @Field(type => [String])
    @Prop([String])
    aliases: string[];

    // photos
    @Field(type => String, { nullable: false })
    @Prop({ required: true })
    description: string;

    @Field(type => String, { nullable: false })
    @Prop({ required: true })
    scope: string;

    @Field(type => Locale, { nullable: true })
    @Prop({ type: LocaleSchema, required: false })
    location?: Locale;

    @Field(type => ProjectStatus, { nullable: false })
    @Prop({ required: true })
    status: ProjectStatus;
    // recommendations
    // deadlines
    @Field(type => [ID])
    @Prop([{ type: SchemaTypes.ObjectId, ref: User.name }])
    currentTeam: User['_id'][];

    @Field(type => ID)
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    manager: User['_id'];

    @Field(type => [ID])
    @Prop([{ type: SchemaTypes.ObjectId, ref: User.name }])
    admins: User['_id'][];

    @Field(type => ID, { nullable: true })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Institution', required: false })
    institution?: Institution['id'];

    @Field(type => Boolean)
    @Prop({ required: true, default: false })
    highlighted: boolean;

    @Field(type => [ID])
    @Prop([{ type: SchemaTypes.ObjectId, ref: Phase.name }])
    phases: Phase['_id'][];

    @Field(type => GraphQLISODateTime, { nullable: true })
    @Prop({ required: false })
    deadline?: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);