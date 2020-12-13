import { MatchService } from './match.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from './schemas/match.schema';
import { FlaskModule } from 'src/flask/flask.module';
import { ServerMatch, ServerMatchSchema } from './schemas/server-match.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Match.name, schema: MatchSchema },
      { name: ServerMatch.name, schema: ServerMatchSchema }
    ]),
    FlaskModule,
  ],
  providers: [MatchService,],
  exports: [MatchService],
})
export class MatchModule { }
