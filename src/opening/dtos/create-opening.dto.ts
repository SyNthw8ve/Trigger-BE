import { Availability } from "src/common/schemas/availability.schema";
import { Locale } from "src/common/schemas/locale.schema";
import { Opening } from "../schemas/opening.schema";

import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { AvailabilityInput } from "src/common/dtos/availability-input.dto";
import { LocaleInput } from "src/common/dtos/locale-input.dto";

@InputType()
export class CreateOpeningDto {

    @Field(type => ID, { nullable: false })
    project: Opening['project'];

    @Field(type => String, { nullable: false })
    area: Opening['area'];

    @Field(type => Float, { nullable: true })
    remuneration?: Opening['remuneration'];

    @Field(type => LocaleInput, { nullable: true })
    location?: Locale;

    @Field(type => [ID], { nullable: true })
    hardskills?: Opening['hardskills'];

    @Field(type => [ID], { nullable: true })
    softskills?: Opening['softskills'];

    @Field(type => [ID], { nullable: true })
    languages?: Opening['languages'];

    @Field(type => AvailabilityInput , { nullable: false })
    availability: Availability;
}