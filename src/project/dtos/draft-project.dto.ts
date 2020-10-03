import { Locale } from "src/common/schemas/locale.schema";
import { Project } from "../schemas/project.schema";

import { InputType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { LocaleInput } from "src/common/dtos/locale-input.dto";
import { User } from "src/user/schemas/user.schema";
import { DraftCreateOpeningDto } from "src/project/dtos/draft-create-opening.dto";

@InputType()
export class DraftProjectDto {

    @Field(type => ID, { nullable: false })
    manager: Project['manager'];

    @Field(type => ID, { nullable: true })
    institution?: Project['institution'];

    @Field(type => String, { nullable: true })
    title?: Project['title'];

    @Field(type => String, { nullable: true })
    description?: Project['description'];

    @Field(type => String, { nullable: true })
    scope?: Project['scope'];

    @Field(type => LocaleInput, { nullable: true })
    location?: Project['location'];

    @Field(type => [DraftCreateOpeningDto],  { nullable: true })
    opening_creations?: DraftCreateOpeningDto[];

    @Field(type => GraphQLISODateTime, { nullable: true })
    initialTeam?: User['_id'][];

    @Field(type => GraphQLISODateTime, { nullable: true })
    deadline?: Project['deadline'];
}