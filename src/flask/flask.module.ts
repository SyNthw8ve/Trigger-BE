import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { FlaskService } from './flask.service';
import { FlaskProcessor } from './flask.processor';
import { HttpModule } from '@nestjs/common';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'flask',
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
        HttpModule],
    providers: [FlaskService, FlaskProcessor],
    exports: [FlaskService]
})
export class FlaskModule { }
