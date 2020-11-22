import { Resolver, Query, Mutation, Args, Parent, ID, ResolveField } from '@nestjs/graphql';
import { SoftQuizRequest } from './dtos/soft-quiz-request.dto';

import { QuestionType, SoftSkillQuestion } from './schemas/soft-quiz.schema';
import { SoftSkillQuestionService } from './soft-quiz.service';

@Resolver(of => SoftSkillQuestion)
export class SoftSkillQuestionsResolver {

    constructor(private quizService: SoftSkillQuestionService) { }

    @Mutation(returns => [SoftSkillQuestion])
    async generateAndSetQuizForUser(@Args('parameters') parameters: SoftQuizRequest): Promise<SoftSkillQuestion[]> {
        return await this.quizService.generateAndSetQuizForUser(parameters);
    }
}