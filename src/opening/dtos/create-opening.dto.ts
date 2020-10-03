import { Locale } from "src/common/schemas/locale.schema";
import { Opening } from "../schemas/opening.schema";

import { InputType, Field, ID, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { AvailabilityInput } from "src/common/dtos/availability-input.dto";
import { LocaleInput } from "src/common/dtos/locale-input.dto";

@InputType()
export class CreateOpeningDto {

    @Field(type => String, { nullable: false })
    name: string;

    @Field(type => String, { nullable: false })
    tasks: string;

    @Field(type => Float, { nullable: true })
    remuneration?: Opening['remuneration'];

    @Field(type => LocaleInput, { nullable: true })
    location?: Locale;

    @Field(type => [ID], { nullable: false, defaultValue: [] })
    hardskills: Opening['hardskills'];

    @Field(type => [ID], { nullable: false, defaultValue: []  })
    softskills: Opening['softskills'];

    @Field(type => [ID], { nullable: false, defaultValue: []  })
    languages: Opening['languages'];

    @Field(type => AvailabilityInput , { nullable: false })
    availability: Opening['availability'];

    @Field(type => GraphQLISODateTime, { nullable: false })
    startDate: Opening['startDate'];

    @Field(type => GraphQLISODateTime, { nullable: false })
    endDate: Opening['endDate'];
}