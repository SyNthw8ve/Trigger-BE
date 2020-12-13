import { Processor, Process } from '@nestjs/bull';
import { HttpService } from '@nestjs/common';
import { Job } from 'bull';
import { beAiConnection } from 'src/config';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Processor('flask')
export class FlaskProcessor {

    constructor(private readonly httpService: HttpService) { }

    @Process('compute_user')
    async computeUserMatches(job: Job<unknown>) {
        let user_id = job.data["user_id"];

        // FIXME: Handle errors
        this.httpService.post(`${beAiConnection}/user_match/${user_id}`).subscribe(
            val => console.info(val),
            error => console.error(error)
        )
    }

    @Process('update_user')
    async updateUserMatches(job: Job<unknown>) {
        let user_id = job.data["user_id"];

        // FIXME: Handle errors
        
        this.httpService.put(`${beAiConnection}/user_match/${user_id}`).subscribe(
            val => console.info(val),
            error => console.error(error)
        )
    }

    @Process('calculate_score')
    async calculateScoreUserOpening(job: Job<unknown>) {
        let user_id = job.data["user_id"];
        let opening_id = job.data["opening_id"];

        // FIXME: Handle errors

        this.httpService.put(`${beAiConnection}/score/${user_id}/${opening_id}`).subscribe(
            val => console.info(val),
            error => console.error(error)
        )
    }

    @Process('insert_opening')
    async insertOpeningToCluster(job: Job<unknown>) {
        let opening_id = job.data["opening_id"];

        // FIXME: Handle errors

        this.httpService.put(`${beAiConnection}/opening/${opening_id}`).subscribe(
            val => console.info(val),
            error => console.error(error)
        )
    }

    @Process('update_opening')
    async updateOpeningInCluster(job: Job<unknown>) {
        let opening_id = job.data["opening_id"];

        // FIXME: Handle errors

        this.httpService.put(`${beAiConnection}/opening/${opening_id}`).subscribe(
            val => console.info(val),
            error => console.error(error)
        )
    }

    @Process('delete_opening')
    async deleteOpeningInCluster(job: Job<unknown>) {
        let opening_id = job.data["opening_id"];

        // FIXME: Handle errors
        
        this.httpService.delete(`${beAiConnection}/opening/${opening_id}`).subscribe(
            val => console.info(val),
            error => console.error(error)
        )
    }
}