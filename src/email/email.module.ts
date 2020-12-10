import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailConsumer } from './email.processor';
import { EmailService } from './email.service';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'email',
            redis: {
                host: 'localhost',
                port: 6379,
            },
        })
    ],
    providers: [EmailService, EmailConsumer],
    exports: [EmailService]
})
export class EmailModule { }
