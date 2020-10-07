import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SoftSkillQuestions, SoftSkillQuestionSchema } from './schemas/soft-quiz.schema';
import { SoftSkillQuestionService } from './soft-quiz.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: SoftSkillQuestions.name, schema: SoftSkillQuestionSchema }])],
    exports: [SoftSkillQuestionService],
    providers: [SoftSkillQuestionService]
})
export class SoftQuizModule { }
