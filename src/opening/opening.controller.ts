import { Controller, Param, Post } from '@nestjs/common';
import { ApplyScoreService } from './apply-score.service';

@Controller("openings")
export class OpeningController {

    constructor(private readonly applyScoreService: ApplyScoreService) { }

    @Post('/user_score/:apply_score_id')
    async communicateUserScoreCalculated(@Param('apply_score_id') apply_score_id) {
        this.applyScoreService.reactToUserScoreCalculated(apply_score_id);
        console.info(`We acknowledge you have calculated the score associated with id ${apply_score_id}`);
    }

}
