import { Availability } from "src/common/schemas/availability.schema";
import { Locale } from "src/common/schemas/locale.schema";
import { Opening } from "../schemas/opening.schema";

import { InputType, Field, ID, Float } from '@nestjs/graphql';

@InputType()
export class CreateOpeningDto {

    @Field(type => ID, { nullable: false })
    project: Opening['project'];

    @Field(type => String, { nullable: false })
    area: Opening['area'];

    @Field(type => Float, { nullable: false })
    remuneration: Opening['remuneration'];

    @Field(type => Locale, { nullable: true })
    location?: Locale;

    // languages;

    // softskills;

    // hardskills;

    availability: Availability;
}