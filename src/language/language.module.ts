import { LanguageController } from './language.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LanguageService } from './language.service';
import { Language, LanguageSchema } from './schemas/language.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Language.name, schema: LanguageSchema }])],
    controllers: [
        LanguageController,],
    providers: [LanguageService],
    exports: [LanguageService]
})
export class LanguageModule { }
