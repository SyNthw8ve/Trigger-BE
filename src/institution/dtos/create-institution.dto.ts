import { Institution } from "../schemas/institution.schema";

export class CreateInstitutionDto {
    manager: Institution['manager'];
    name: Institution['name'];
    // photo
    description: Institution['description'];
    sector: Institution['sector'];
    // location
    // favorites: (User | Institution)[];
}