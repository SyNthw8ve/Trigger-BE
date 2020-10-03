import { Locale } from "src/common/schemas/locale.schema";
import { Opening } from "../../opening/schemas/opening.schema";

import { InputType, Field, ID, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { AvailabilityInput } from "src/common/dtos/availability-input.dto";
import { LocaleInput } from "src/common/dtos/locale-input.dto";

@InputType()
export class DraftCreateOpeningDto {

    @Field(type => String, { nullable: true })
    name?: string;

    @Field(type => String, { nullable: true })
    tasks?: string;

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

    @Field(type => AvailabilityInput, { nullable: true })
    availability?: Opening['availability'];

    @Field(type => GraphQLISODateTime, { nullable: true })
    startDate?: Opening['startDate'];

    @Field(type => GraphQLISODateTime, { nullable: true })
    endDate?: Opening['endDate'];
}