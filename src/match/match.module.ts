import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from './schemas/match.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }])],
  controllers: [],
  providers: [],
  exports: [],
})
export class MatchModule { }
