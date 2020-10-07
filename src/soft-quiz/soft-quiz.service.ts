import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SoftSkillQuestions } from './schemas/soft-quiz.schema';
import { QuizAnswer } from './dtos/soft-quiz.dto';

@Injectable()
export class SoftSkillQuestionService {

    constructor(@InjectModel(SoftSkillQuestions.name) private questionModel: Model<SoftSkillQuestions>) { }

    async getQuiz() : Promise<SoftSkillQuestions[]> {

        const quiz = await this.questionModel.find();
        
        this.shuffleQuiz(quiz);

        return quiz;
    }

    async computeQuizResults(answers: QuizAnswer[]) {

        
    }

    private shuffleQuiz(quiz: SoftSkillQuestions[]) {

        for(let i = quiz.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * i);
            const temp = quiz[i];

            quiz[i] = quiz[j];
            quiz[j] = temp; 
        }
    }
}