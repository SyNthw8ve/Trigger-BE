import { User } from "src/user/schemas/user.schema";
import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Institution } from "src/institution/schemas/institution.schema";
import { Locale, LocaleSchema } from "src/common/schemas/locale.schema";

import { Field, ObjectType, ID, registerEnumType, GraphQLISODateTime } from '@nestjs/graphql';
import { Opening } from "src/opening/schemas/opening.schema";

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
    @Prop({ type: String, required: true })
    title: string;

    @Field(type => [String])
    @Prop([String])
    aliases: string[];

    // photos

    // logo

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    description: string;

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    scope: string;

    @Field(type => Locale, { nullable: false })
    @Prop({ type: LocaleSchema, required: true })
    location: Locale;

    @Field(type => ProjectStatus, { nullable: false })
    @Prop({ type: ProjectStatus, required: true })
    status: ProjectStatus;

    // recommendations
    
    @Field(type => [ID])
    @Prop([{ type: SchemaTypes.ObjectId, ref: 'User' }])
    currentTeam: User['_id'][];

    @Field(type => ID)
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
    manager: User['_id'];

    @Field(type => [ID])
    @Prop([{ type: SchemaTypes.ObjectId, ref: 'User' }])
    admins: User['_id'][];

    @Field(type => ID, { nullable: true })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Institution', required: false })
    institution?: Institution['id'];

    @Field(type => Boolean)
    @Prop({ type: Boolean, required: true, default: false })
    highlighted: boolean;

    @Field(type => [ID])
    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Opening' }])
    openings: Opening['_id'][];

    @Field(type => GraphQLISODateTime, { nullable: true })
    @Prop({ type: Date, required: false })
    deadline?: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);