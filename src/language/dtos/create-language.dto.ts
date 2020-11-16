import { Language, LanguageLevelInput } from "../schemas/language.schema";
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLanguageDto {

    @Field(type => String, { nullable: false })
    name: Language['name'];

    @Field(type => [LanguageLevelInput], { nullable: false })
    readingLevels: LanguageLevelInput[];

    @Field(type => [LanguageLevelInput], { nullable: false })
    understandingLevels: LanguageLevelInput[];

    @Field(type => [LanguageLevelInput], { nullable: false })
    speakingLevels: LanguageLevelInput[];

    @Field(type => [LanguageLevelInput], { nullable: false })
    writingLevels: LanguageLevelInput[];
}