import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpeningService } from './opening.service';
import { ApplyScore } from './schemas/apply-score.schema';

@Injectable()
export class ApplyScoreService {

    constructor(@InjectModel(ApplyScore.name) private model: Model<ApplyScore>,
        private readonly openingService: OpeningService) { }

    async reactToUserScoreCalculated(apply_score_id: ApplyScore['_id']) {
        let applyScore = await this.model.findById(apply_score_id);
        //TODO: availability? change the score in some way?        
        this.openingService.addApplyScoreToApplication(applyScore);
    }

}
