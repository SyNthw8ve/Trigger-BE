import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from './schemas/match.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }]),
    HttpModule
  ],
  controllers: [
    MatchController,],
  providers: [
    MatchService,],
  exports: [MatchService],
})
export class MatchModule { }
