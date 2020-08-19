import { Institution } from "../schemas/institution.schema";

export class CreateInstitutionDto {
    creator: Institution['creator'];
    name: Institution['name'];
    // photo
    description: Institution['description'];
    sector: Institution['sector'];
    // location
    // favorites: (User | Institution)[];
}