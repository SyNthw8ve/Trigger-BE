import { Controller, Param, Post } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller("matches")
export class MatchController {

    constructor(private readonly matchService: MatchService) { }

    @Post('/user_created/:id')
    async onNofifyMatchesUserCreated(@Param('id') id): Promise<string> {
        this.matchService.onMatchesOfUserCreated(id);
        return `We acknowledge you have done matches of user id ${id}`;
    }

    @Post('/user_updated/:id')
    async onNofifyMatchesUserUpdated(@Param('id') id): Promise<string> {
        this.matchService.onMatchesOfUserUpdated(id);
        return `We acknowledge you have updated matches of user id ${id}`;
    }

    @Post('/user_score/:user_id/:opening_id')
    async onNofifyUserScoreCalculated(@Param('user_id') user_id, @Param('opening_id') opening_id): Promise<string> {
        this.matchService.onUserScoreCalculated(user_id, opening_id);
        return `We acknowledge you have calculated the score between user id ${user_id} and ${opening_id}`;
    }

}
