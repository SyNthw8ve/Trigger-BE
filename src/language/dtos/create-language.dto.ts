import { Language } from "../schemas/language.schema";
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLanguageDto {

    @Field(type => String, { nullable: false })
    name: Language['name'];
}