import { CreateLanguageDto } from './dtos/create-language.dto';
import { LanguageService } from './language.service';
import { Language } from './schemas/language.schema';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver(of => Language)
export class LanguageResolver {

    constructor(private readonly languageService: LanguageService) { }

    @Mutation(returns => Language)
    async newLanguage(@Args('language') language: CreateLanguageDto): Promise<Language> {
        return await this.languageService.new(language);
    }

    @Query(returns => [Language])
    async getLanguages() : Promise<Language[]> {

        return await this.languageService.getAll();
    }

}
