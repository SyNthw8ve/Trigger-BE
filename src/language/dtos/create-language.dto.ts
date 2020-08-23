import { Language } from "../schemas/language.schema";

export class CreateLanguageDto {
    name: Language['name'];
}