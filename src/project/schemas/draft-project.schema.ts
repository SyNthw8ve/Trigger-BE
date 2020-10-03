import { User } from "src/user/schemas/user.schema";
import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Locale, LocaleSchema } from "src/common/schemas/locale.schema";

import { Field, ObjectType, ID, GraphQLISODateTime, Int } from '@nestjs/graphql';
import { Project } from "./project.schema";
import { DraftCreateOpening, DraftCreateOpeningSchema } from "src/project/schemas/draft-create-opening.schema";

@ObjectType()
@Schema()
export class DraftProject extends Document {

    @Field(type => ID, { nullable: false })
    _id: Document['_id'];

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: false })
    title?: Project['title'];

    // photos

    // logo

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: false })
    description?: Project['description'];

    @Field(type => String, { nullable: true, defaultValue: null })
    @Prop({ type: String, required: false })
    scope?: Project['scope'];

    @Field(type => Locale, { nullable: true })
    @Prop({ type: LocaleSchema, required: false })
    location?: Project['location'];

    @Field(type => ID)
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    manager?: Project['manager'];

    @Field(type => ID, { nullable: true })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Institution', required: false })
    institution?: Project['institution'];

    @Field(type => [DraftCreateOpening])
    @Prop([{ type: DraftCreateOpeningSchema, ref: DraftCreateOpening.name }])
    opening_creations?: DraftCreateOpening[];

    @Field(type => GraphQLISODateTime, { nullable: true })
    @Prop([{ type: SchemaTypes.ObjectId, ref: 'User', required: false }])
    initialTeam?: User['_id'][];

    @Field(type => GraphQLISODateTime, { nullable: true })
    @Prop({ type: Date, required: false })
    deadline?: Project['deadline'];
}

export const DraftProjectSchema = SchemaFactory.createForClass(DraftProject);