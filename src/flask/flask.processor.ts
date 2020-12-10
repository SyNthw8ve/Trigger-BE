import { Processor, Process } from '@nestjs/bull';
import { HttpService } from '@nestjs/common';
import { Job } from 'bull';
import { beAiConnection } from 'src/config';

@Processor('flask')
export class FlaskProcessor {

    constructor(private readonly httpService: HttpService) { }

    @Process('compute_user')
    async computeUserMatches(job: Job<unknown>) {
        let user_id = job.data["user_id"];

        let result = this.httpService.post(`${beAiConnection}/user_match/${user_id}`);
        result.subscribe(val => console.info(val));
    }

    @Process('update_user')
    async updateUserMatches(job: Job<unknown>) {
        let user_id = job.data["user_id"];

        let resut = this.httpService.put(`${beAiConnection}/user_match/${user_id}`);
        resut.subscribe(val => console.info(val));
    }

    @Process('calculate_score')
    async calculateScoreUserOpening(job: Job<unknown>) {
        let user_id = job.data["user_id"];
        let opening_id = job.data["opening_id"];

        let resut = this.httpService.put(`${beAiConnection}/score/${user_id}/${opening_id}`);
        resut.subscribe(val => console.info(val));
    }

    @Process('insert_opening')
    async insertOpeningToCluster(job: Job<unknown>) {
        let opening_id = job.data["opening_id"];

        this.httpService.put(`${beAiConnection}/opening/${opening_id}`);
    }

    @Process('update_opening')
    async updateOpeningInCluster(job: Job<unknown>) {
        let opening_id = job.data["opening_id"];

        this.httpService.put(`${beAiConnection}/opening/${opening_id}`);
    }

    @Process('delete_opening')
    async deleteOpeningInCluster(job: Job<unknown>) {
        let opening_id = job.data["opening_id"];

        this.httpService.delete(`${beAiConnection}/opening/${opening_id}`);
    }
}