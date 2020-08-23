import { Locale } from "src/common/schemas/locale.schema";
import { Institution } from "../schemas/institution.schema";

export class CreateInstitutionDto {
    creator: Institution['creator'];
    name: Institution['name'];
    // photo
    description: Institution['description'];
    sector: Institution['sector'];
    locationAdress: Locale['address'];
    // favorites: (User | Institution)[];
}