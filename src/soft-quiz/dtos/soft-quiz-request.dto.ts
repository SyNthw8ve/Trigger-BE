import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { QuestionType } from '../schemas/soft-quiz.schema';

@InputType()
export class QuestionTypeParameters {

    @Field(type => QuestionType, { nullable: false })
    questionType: QuestionType;

    @Field(type => Int, { nullable: false })
    count: number;
}

@InputType()
export class SoftQuizRequest {

    @Field(type => ID, { nullable: false })
    user_id: any;

    // TODO: There doesn't seem to be a better way to do this...
    // What was needed was a Map<QuestionType, QuestionTypeParameters> but 
    // GraphQL doesn't have that
    @Field(type => [QuestionTypeParameters], { nullable: false })
    questionParameters: QuestionTypeParameters[];
}