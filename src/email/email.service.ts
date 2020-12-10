import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class EmailService {
    constructor(@InjectQueue('email') private readonly emailQueue: Queue) { }

    async scheduleConfirmationEmail(code: string) {
        await this.emailQueue.add('confirmation', {
            code,
        });
    }
}
