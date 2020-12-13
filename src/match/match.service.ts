import { Injectable } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { Opening } from 'src/opening/schemas/opening.schema';
import { FlaskService } from 'src/flask/flask.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchType } from './schemas/match.schema';
import { ServerMatch } from './schemas/server-match.schema';
import { OpeningService } from 'src/opening/opening.service';

@Injectable()
export class MatchService {

    constructor(private readonly flaskService: FlaskService,
        @InjectModel(Match.name) private readonly matchModel: Model<Match>,
        @InjectModel(ServerMatch.name) private readonly serverMatchModel: Model<ServerMatch>,) { }

    async reactToMatchesOfUserUpdated(user_id: User['_id']): Promise<void> {
        console.info(`Matches of ${user_id} have been updated!`);
        // TODO: ...here? remove other matches?
        // TODO: ...notifications too?
    }

    async isSuperMatch(user_id: User['_id'], opening_id: Opening['_id']) {
        // TODO: implement
        return false;
    }

    async reactToMatchesOfUserCreated(user_id: User['_id']): Promise<void> {
        let serverMatches = await this.serverMatchModel.find({
            user_id: user_id
        });

        for (let serverMatch of serverMatches) {
            // TODO: availability
            // TODO: change score a bit?
            let score = serverMatch.final_score;
            let data = {
                // FIXME: There's only openings, delete this...
                type: MatchType.Opening,
                user: user_id,
                matching: serverMatch.opening_id,
                superMatch: await this.isSuperMatch(user_id, serverMatch.opening_id),
                score: score
            };

            // TODO: do we need to await here?
            this.matchModel.create(data);
        }

        let idsToDelete = serverMatches.map(sv => sv.id);

        // TODO: notifications

        await this.serverMatchModel.deleteMany({ _id: { $in: idsToDelete } });
    }

    async reactToUserScoreCalculated(user_id: User['_id'], opening_id: Opening['_id']) {
        console.info(`Score between ${user_id} and ${opening_id} has been calculated!`);
        // TODO: ...notification here?
        // TODO: Could this be abused to get early matches? Do we allow it?
        // TODO: Is this only when a user applies for an opening?
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
