import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [BullModule.registerQueue({
        name: 'flask',
        redis: {
            host: 'localhost',
            port: 6379,
        },
    })]
})
export class FlaskModule { }
