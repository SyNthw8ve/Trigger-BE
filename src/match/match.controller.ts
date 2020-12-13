import { Get } from '@nestjs/common';
import { Controller, Param, Post } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller("matches")
export class MatchController {

    constructor(private readonly matchService: MatchService) { }

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

}
