import { Locale } from "src/common/schemas/locale.schema";
import { Project } from "../schemas/project.schema";

export class CreateProjectDto {
    manager: Project['manager'];
    institution?: Project['institution'];
    title: Project['title'];
    description: Project['description'];
    scope: Project['scope'];
    locationAdress: Locale['address'];
}