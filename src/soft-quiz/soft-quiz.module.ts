import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SoftSkillQuestion, SoftSkillQuestionSchema } from './schemas/soft-quiz.schema';
import { SoftSkillQuestionService } from './soft-quiz.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: SoftSkillQuestion.name, schema: SoftSkillQuestionSchema }])],
    exports: [SoftSkillQuestionService],
    providers: [SoftSkillQuestionService],
})
export class SoftQuizModule { }
