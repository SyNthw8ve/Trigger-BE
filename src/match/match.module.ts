import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from './schemas/match.schema';
import { FlaskModule } from 'src/flask/flask.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }]),
    FlaskModule,
  ],
  controllers: [MatchController,],
  providers: [MatchService,],
  exports: [MatchService],
})
export class MatchModule { }
