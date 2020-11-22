import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { SoftSkillQuestion, SoftSkillQuestionSchema } from './schemas/soft-quiz.schema';
import { SoftSkillQuestionsResolver } from './soft-quiz.resolver';
import { SoftSkillQuestionService } from './soft-quiz.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: SoftSkillQuestion.name, schema: SoftSkillQuestionSchema }]),
        UserModule
    ],
    providers: [SoftSkillQuestionService, SoftSkillQuestionsResolver],
    exports: [SoftSkillQuestionService],
})
export class SoftQuizModule { }
