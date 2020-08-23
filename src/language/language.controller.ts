import { Body, Controller, Post } from '@nestjs/common';
import { CreateLanguageDto } from './dtos/create-language.dto';
import { LanguageService } from './language.service';
import { Language } from './schemas/language.schema';

@Controller("language")
export class LanguageController {

    constructor(private readonly hardskillService: LanguageService) { }

    @Post()
    async new(@Body() registerHardSkill: CreateLanguageDto): Promise<Language> {
        return this.hardskillService.new(registerHardSkill);
    }

}
