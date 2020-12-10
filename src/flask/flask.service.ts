import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Opening } from 'src/opening/schemas/opening.schema';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class FlaskService {

    constructor(@InjectQueue('flask') private readonly flaskQueue: Queue) { }

    async scheduleComputeUserMatches(user_id: User['_id']) {
        await this.flaskQueue.add('compute_user', {
            user_id,
        });
    }

    async scheduleUpdateUserMatches(user_id: User['_id']) {
        await this.flaskQueue.add('update_user', {
            user_id,
        });
    }

    async scheduleCalculateScoreUserOpening(user_id: User['_id'], opening_id: Opening['_id']) {
        await this.flaskQueue.add('calculate_score', {
            user_id,
            opening_id
        });
    }

    async scheduleInsertOpeningToCluster(opening_id: Opening['_id']) {
        await this.flaskQueue.add('insert_opening', {
            opening_id,
        });
    }

    async scheduleUpdateOpeningInCluster(opening_id: Opening['_id']) {
        await this.flaskQueue.add('update_opening', {
            opening_id,
        });
    }

    async scheduleDeleteOpeningInCluster(opening_id: Opening['_id']) {
        await this.flaskQueue.add('delete_opening', {
            opening_id,
        });
    }

}
