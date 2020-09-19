import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'email',
            redis: {
                host: 'localhost',
                port: 6379,
            },
        })
    ]
})
export class EmailModule { }
