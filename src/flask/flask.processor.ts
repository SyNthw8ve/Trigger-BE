import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('flask')
export class FlaskProcessor {

    @Process()
    async computeUserMatches(job: Job<unknown>) {

    }

    @Process()
    async updateUserMatches(job: Job<unknown>) {

    }

    @Process()
    async insertOpeningToCluster(job: Job<unknown>) {

    }

    @Process()
    async updateOpeningInCluster(job: Job<unknown>) {

    }

    @Process()
    async deleteOpeningInCluster(job: Job<unknown>) {
        
    }
}