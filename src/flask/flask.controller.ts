import { Param, Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { MatchService } from 'src/match/match.service';
import { OpeningService } from 'src/opening/opening.service';

@Controller("flask")
export class FlaskController {

    constructor(private readonly matchService: MatchService,
        private readonly openingService: OpeningService) { }

    @Get('/user_created/:id')
    async communicateMatchesUserCreated(@Param('id') id) {
        this.matchService.reactToMatchesOfUserCreated(id);
        console.info(`We acknowledge you have done matches of user id ${id}`);
    }

    @Post('/user_updated/:id')
    async communicateMatchesUserUpdated(@Param('id') id) {
        this.matchService.reactToMatchesOfUserUpdated(id);
        console.info(`We acknowledge you have updated matches of user id ${id}`);
    }

    @Post('/user_score/:apply_score_id')
    async communicateUserScoreCalculated(@Param('apply_score_id') apply_score_id) {
        this.openingService.reactToUserScoreCalculated(apply_score_id);
        console.info(`We acknowledge you have calculated the score associated with id ${apply_score_id}`);
    }

}
