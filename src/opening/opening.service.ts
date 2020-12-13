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

    constructor(@InjectModel(Opening.name) private model: Model<Opening>) { }

    async new(createDto: CreateOpeningDto, project: Project['_id']): Promise<Opening> {
        // TODO: validate this

        let data = {
            project,
            ...createDto
        }

        const created = new this.model(data);

        return created.save();
    }

    async addApplyScoreToApplication(applyScore: ApplyScore) {
        //FIXME: Should we pass the whole ApplyScore object?
        //TODO: notifications

        let opening = await this.model.findById(applyScore.opening_id);
        let application = opening.applications.find((application) => application.user == applyScore.user_id);
        application.not_match_score = applyScore.score;

        await opening.save();
    }

    async addMatchInformationToApplication() {
    }

}
