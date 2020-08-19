import { Locale } from "src/common/dtos/locale.dto";
import { Project } from "../schemas/project.schema";

export class CreateProjectDto {
    manager: Project['manager'];
    institution?: Project['institution'];
    title: Project['title'];
    description: Project['description'];
    scope: Project['scope'];
    location_adress: Locale['address'];
}