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

}
