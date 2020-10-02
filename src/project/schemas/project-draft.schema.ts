import { User } from "src/user/schemas/user.schema";
import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Locale, LocaleSchema } from "src/common/schemas/locale.schema";

import { Field, ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Project } from "./project.schema";
import { Opening } from "src/opening/schemas/opening.schema";

@ObjectType()
@Schema()
export class ProjectDraft extends Document {

    @Field(type => ID, { nullable: false })
    _id: Document['_id'];

    @Field(type => String, { nullable: false })
    @Prop({ required: true })
    title: Project['title'];

    // photos

    // logo

    @Field(type => String, { nullable: false })
    @Prop({ required: true })
    description: Project['description'];

    @Field(type => String, { nullable: false })
    @Prop({ required: true })
    scope: Project['scope'];

    @Field(type => Locale, { nullable: true })
    @Prop({ type: LocaleSchema, required: false })
    location?: Project['location'];

    @Field(type => ID)
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    manager: Project['manager'];

    @Field(type => ID, { nullable: true })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Institution', required: false })
    institution?: Project['institution'];

    @Field(type => [ID])
    @Prop([{ type: SchemaTypes.ObjectId, ref: Opening.name }])
    openings: Project['openings'];

    @Field(type => GraphQLISODateTime, { nullable: true })
    @Prop({ required: false })
    initialTeam?: User['_id'][];

    @Field(type => GraphQLISODateTime, { nullable: true })
    @Prop({ required: false })
    deadline?: Project['deadline'];
}

export const ProjectDraftSchema = SchemaFactory.createForClass(ProjectDraft);