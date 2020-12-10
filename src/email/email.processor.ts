import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('email')
export class EmailConsumer {

    @Process('invite')
    async sendInviteEmail(job: Job<unknown>) {

    }

    @Process('confirmation')
    async sendConfirmationEmail(job: Job<unknown>) {

    }
}