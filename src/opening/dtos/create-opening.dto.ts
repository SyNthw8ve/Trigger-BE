import { Availability } from "src/common/dtos/availability.dto";
import { Locale } from "src/common/dtos/locale.dto";
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