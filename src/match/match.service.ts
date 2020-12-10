import { HttpService, Injectable } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { beAiConnection } from 'src/config';
import { Opening } from 'src/opening/schemas/opening.schema';

@Injectable()
export class MatchService {

    constructor(private readonly httpService: HttpService) { }

    async attendToMatchesOfUserUpdated(user_id: User['_id']): Promise<void> {
        console.log(`Matches of ${user_id} have been updated!`);
    }

    async attendToMatchesOfUserCreated(user_id: User['_id']): Promise<void> {
        console.log(`Matches of ${user_id} have been created!`);
    }

    async attendToUserScoreCalculated(user_id: User['_id'], opening_id: Opening['_id']) {
        console.log(`Score between ${user_id} and ${opening_id} has been calculated!`);
    }

    async attendToUserUpdated(user_id: User['_id']): Promise<void> {
        let resut = this.httpService.put(`${beAiConnection}/user_match/${user_id}`);
        resut.subscribe(val => console.log(val));
    }

    async attendToUserCreated(user_id: User['_id']): Promise<void> {
        let result = this.httpService.post(`${beAiConnection}/user_match/${user_id}`);
        result.subscribe(val => console.log(val));
    }

    async attendToOpeningChanged(opening_id: Opening['_id']): Promise<void> {
        this.httpService.put(`${beAiConnection}/opening/${opening_id}`);
    }

    async attendToOpeningCreated(opening_id: Opening['_id']): Promise<void> {
        let result = this.httpService.post(`${beAiConnection}/opening/${opening_id}`);
        result.subscribe(val => console.log(val));
    }

    async attendToOpeningRemoved(opening_id: Opening['_id']): Promise<void> {
        this.httpService.delete(`${beAiConnection}/opening/${opening_id}`);
    }

}
