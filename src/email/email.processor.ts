import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('email')
export class EmailConsumer {

    @Process()
    async sendInviteEmail(job: Job<unknown>) {

    }
}