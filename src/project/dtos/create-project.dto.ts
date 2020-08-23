import { Locale } from "src/common/schemas/locale.schema";
import { Project } from "../schemas/project.schema";

import { InputType, Field, ID } from '@nestjs/graphql';

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

    @Field(type => String, { nullable: false })
    locationAdress: Locale['address'];
}