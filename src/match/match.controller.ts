import { Controller, Param, Post } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller("matches")
export class MatchController {

    constructor(private readonly matchService: MatchService) { }

    @Post('/user_created/:id')
    async communicateMatchesUserCreated(@Param('id') id): Promise<string> {
        this.matchService.attendToMatchesOfUserCreated(id);
        return `We acknowledge you have done matches of user id ${id}`;
    }

    @Post('/user_updated/:id')
    async communicateMatchesUserUpdated(@Param('id') id): Promise<string> {
        this.matchService.attendToMatchesOfUserUpdated(id);
        return `We acknowledge you have updated matches of user id ${id}`;
    }

    @Post('/user_score/:user_id/:opening_id')
    async communicateUserScoreCalculated(@Param('user_id') user_id, @Param('opening_id') opening_id): Promise<string> {
        this.matchService.attendToUserScoreCalculated(user_id, opening_id);
        return `We acknowledge you have calculated the score between user id ${user_id} and ${opening_id}`;
    }

}
