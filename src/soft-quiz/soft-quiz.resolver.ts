import { Resolver, Query, Mutation, Args, Parent, ID, ResolveField } from '@nestjs/graphql';

import { SoftSkillQuestions } from './schemas/soft-quiz.schema';
import { SoftSkillQuestionService } from './soft-quiz.service';

@Resolver(of => SoftSkillQuestions)
export class SoftSkillQuestionsResolver {

    constructor(private quizService: SoftSkillQuestionService) { }

    @Query(returns => [SoftSkillQuestions])
    async getQuiz() : Promise<SoftSkillQuestions[]> {

        return await this.quizService.getQuiz();
    }
}