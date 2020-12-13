import { forwardRef, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { FlaskService } from './flask.service';
import { FlaskProcessor } from './flask.processor';
import { HttpModule } from '@nestjs/common';
import { FlaskController } from './flask.controller';
import { MatchModule } from 'src/match/match.module';
import { OpeningModule } from 'src/opening/opening.module';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'flask',
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
        HttpModule,
        forwardRef(() => MatchModule),
        forwardRef(() => OpeningModule),
    ],
    providers: [FlaskService, FlaskProcessor],
    controllers: [FlaskController],
    exports: [FlaskService]
})
export class FlaskModule { }
