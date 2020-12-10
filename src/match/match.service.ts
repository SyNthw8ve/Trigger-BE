import { Injectable } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { Opening } from 'src/opening/schemas/opening.schema';
import { FlaskService } from 'src/flask/flask.service';

@Injectable()
export class MatchService {

    constructor(private readonly flaskService: FlaskService) { }

    async attendToMatchesOfUserUpdated(user_id: User['_id']): Promise<void> {
        console.info(`Matches of ${user_id} have been updated!`);
        // TODO: ...here? remove other matches?
        // TODO: ...notifications too?
    }

    async attendToMatchesOfUserCreated(user_id: User['_id']): Promise<void> {
        console.info(`Matches of ${user_id} have been created!`);
    }

    async attendToUserScoreCalculated(user_id: User['_id'], opening_id: Opening['_id']) {
        console.info(`Score between ${user_id} and ${opening_id} has been calculated!`);
        // TODO: ...notification here?
    }

    async attendToUserUpdated(user_id: User['_id']): Promise<void> {
        await this.flaskService.scheduleUpdateUserMatches(user_id);
        // TODO: ...or here? remove other matches?
        // TODO: ...notifications too?
    }

    async attendToUserCreated(user_id: User['_id']): Promise<void> {
        await this.flaskService.scheduleComputeUserMatches(user_id);
    }

    async attendToOpeningChanged(opening_id: Opening['_id']): Promise<void> {
        await this.flaskService.scheduleUpdateOpeningInCluster(opening_id);
        // TODO: remove other matches?
        // TODO: ...notifications too?
    }

    async attendToOpeningCreated(opening_id: Opening['_id']): Promise<void> {
        await this.flaskService.scheduleInsertOpeningToCluster(opening_id);
    }

    async attendToOpeningRemoved(opening_id: Opening['_id']): Promise<void> {
        await this.flaskService.scheduleDeleteOpeningInCluster(opening_id);
        // TODO: remove other matches?
        // TODO: ...notifications too?
    }

}
