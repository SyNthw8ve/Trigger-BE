import { Availability } from "src/common/schemas/availability.schema";
import { Locale } from "src/common/schemas/locale.schema";
import { Opening } from "../schemas/opening.schema";

export class CreateOpeningDto {
    project: Opening['project'];
    area: Opening['area'];
    remuneration: Opening['remuneration'];
    location?: Locale;

    // languages;

    // softskills;

    // hardskills;

    availability: Availability;
}