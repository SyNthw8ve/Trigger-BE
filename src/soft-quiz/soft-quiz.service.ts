import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SoftSkillQuestion } from './schemas/soft-quiz.schema';
import { QuizAnswer } from './dtos/soft-quiz.dto';

@Injectable()
export class SoftSkillQuestionService {

    constructor(@InjectModel(SoftSkillQuestion.name) private questionModel: Model<SoftSkillQuestion>) { }

    async getQuiz(): Promise<SoftSkillQuestion[]> {

        const quiz = await this.questionModel.find();
        
        this.shuffleQuiz(quiz);

        return quiz;
    }

    async computeQuizResults(answers: QuizAnswer[]) {

        
    }

    private shuffleQuiz(quiz: SoftSkillQuestion[]) {


        for(let i = quiz.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * i);
            const temp = quiz[i];

            quiz[i] = quiz[j];
            quiz[j] = temp; 
        }
    }
}