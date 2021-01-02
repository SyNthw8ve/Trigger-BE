import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Model } from 'mongoose';
import { Project } from 'src/project/schemas/project.schema';
import { User } from 'src/user/schemas/user.schema';
import { CreateOpeningDto } from './dtos/create-opening.dto';
import { ApplyScore } from './schemas/apply-score.schema';
import { Opening } from './schemas/opening.schema';

@Injectable()
export class OpeningService {

    constructor(@InjectModel(Opening.name) private openingModel: Model<Opening>,
        @InjectModel(ApplyScore.name) private applyScoreModel: Model<ApplyScore>,) { }


    async reactToUserScoreCalculated(apply_score_id: ApplyScore['_id']) {
        let applyScore = await this.applyScoreModel.findById(apply_score_id);
        //TODO: availability? change the score in some way?     
        //TODO: notifications

        let opening = await this.openingModel.findById(applyScore.opening_id);
        let application = opening.applications.find((application) => application.user == applyScore.user_id);
        application.not_match_score = applyScore.score;

        await opening.save();
    }

    async findWithId(id: Opening['_id']): Promise<Opening> {
        return await this.openingModel.findById(id);
    }

    async new(createDto: CreateOpeningDto, project: Project['_id']): Promise<Opening> {
        // TODO: validate this

        let data = {
            project,
            ...createDto
        }

        const created = new this.openingModel(data);

        return created.save();
    }

    async addMatchInformationToApplication() {
    }

}
