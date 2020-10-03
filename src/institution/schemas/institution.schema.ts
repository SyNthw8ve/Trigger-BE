import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { User } from "src/user/schemas/user.schema";
import { Project } from "src/project/schemas/project.schema";
import { Locale, LocaleSchema } from "src/common/schemas/locale.schema";

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Institution extends Document {

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    name: String;
    // photo
    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    description: String;

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: false })
    institutionalPage: String;

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    sector: String;

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    creator: User['_id'];

    @Field(type => Locale, { nullable: false })
    @Prop({ type: LocaleSchema, required: true })
    location: Locale;

    @Field(type => [ID])
    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Project' }])
    projects: Project['_id'][];
    // favorites: (User | Institution)[];
    // recommendations [of it's projects]
    // recommended by
}


export const InstitutionSchema = SchemaFactory.createForClass(Institution);