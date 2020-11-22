import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { QuestionType, SoftSkillQuestion } from './schemas/soft-quiz.schema';
import { QuizAnswer } from './dtos/soft-quiz.dto';
import { SoftQuizRequest } from './dtos/soft-quiz-request.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SoftSkillQuestionService {

    constructor(
        @InjectModel(SoftSkillQuestion.name) private questionModel: Model<SoftSkillQuestion>,
        private userService: UserService
    ) { }

    async generateAndSetQuizForUser(parameters: SoftQuizRequest): Promise<SoftSkillQuestion[]> {
        const quiz = await this.createQuizForUser(parameters);
        
        this.userService.setQuizData(parameters.user_id, quiz);

        return quiz;
    }

    async createQuizForUser(questionParameters: SoftQuizRequest): Promise<SoftSkillQuestion[]> {
        let quiz = [];

        for (let questionTypeParameters of questionParameters.questionParameters) {

            const questionType = questionTypeParameters.questionType;
            const numberOfQuestions = questionTypeParameters.count;

            const questionsOfThisType = await this.questionModel.aggregate(
                [
                    { $match: { questionType: { $eq: questionType } } },
                    { $sample: { size: numberOfQuestions } }
                ]
            );
            quiz.push(...questionsOfThisType);
        }

        return quiz;
    }

    async computeQuizResults(answers: QuizAnswer[]) {


    }
}