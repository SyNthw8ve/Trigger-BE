import { Resolver, Query, Mutation, Args, Parent, ID, ResolveField } from '@nestjs/graphql';

import { SoftSkillQuestion } from './schemas/soft-quiz.schema';
import { SoftSkillQuestionService } from './soft-quiz.service';

@Resolver(of => SoftSkillQuestion)
export class SoftSkillQuestionsResolver {

    constructor(private quizService: SoftSkillQuestionService) { }

    @Query(returns => [SoftSkillQuestion])
    async getQuiz(): Promise<SoftSkillQuestion[]> {

        return await this.quizService.getQuiz();
    }
}