import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SoftSkillQuestions, SoftSkillQuestionSchema } from './schemas/soft-quiz.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: SoftSkillQuestions.name, schema: SoftSkillQuestionSchema }])],
    exports: [],
    providers: []
})
export class SoftQuizModule { }
