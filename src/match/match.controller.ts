import { Controller, Param, Post } from '@nestjs/common';

@Controller("matches")
export class MatchController {

    @Post('/user_created/:id')
    async onNofifyMatchesUserCreated(@Param('id') id): Promise<string> {
        return `We acknowledge you have done matches of user id ${id}`;
    }

    @Post('/user_updated/:id')
    async onNofifyMatchesUserUpdated(@Param('id') id): Promise<string> {
        return `We acknowledge you have updated matches of user id ${id}`;
    }

}
