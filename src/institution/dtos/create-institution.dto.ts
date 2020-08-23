import { Locale } from "src/common/schemas/locale.schema";
import { Institution } from "../schemas/institution.schema";
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateInstitutionDto {

    @Field(type => ID, { nullable: false })
    creator: Institution['creator'];

    @Field(type => String, { nullable: false })
    name: Institution['name'];
    // photo
    @Field(type => String, { nullable: false })
    description: Institution['description'];

    @Field(type => String, { nullable: false })
    sector: Institution['sector'];

    @Field(type => String, { nullable: false })
    locationAdress: Locale['address'];
    // favorites: (User | Institution)[];
}