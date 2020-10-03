import { Locale } from "src/common/schemas/locale.schema";
import { Project } from "../schemas/project.schema";

import { InputType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { LocaleInput } from "src/common/dtos/locale-input.dto";
import { SchemaTypes } from "mongoose";
import { Opening } from "src/opening/schemas/opening.schema";
import { Prop } from "@nestjs/mongoose";
import { User } from "src/user/schemas/user.schema";

@InputType()
export class CreateProjectDto {

    @Field(type => ID, { nullable: false })
    manager: Project['manager'];

    @Field(type => ID, { nullable: true })
    institution?: Project['institution'];

    @Field(type => String, { nullable: false })
    title: Project['title'];

    @Field(type => String, { nullable: false })
    description: Project['description'];

    @Field(type => String, { nullable: false })
    scope: Project['scope'];

    @Field(type => LocaleInput, { nullable: false })
    location: Locale;

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