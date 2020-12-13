import { OpeningResolver } from './opening.resolver';
import { OpeningService } from './opening.service';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Opening, OpeningSchema } from './schemas/opening.schema';
import { LanguageModule } from 'src/language/language.module';
import { HardskillModule } from 'src/hardskill/hardskill.module';
import { SoftskillModule } from 'src/softskill/softskill.module';
import { ProjectModule } from 'src/project/project.module';
import { MatchModule } from 'src/match/match.module';
import { ApplyScore, ApplyScoreSchema } from './schemas/apply-score.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Opening.name, schema: OpeningSchema },
      { name: ApplyScore.name, schema: ApplyScoreSchema },
    ]),
    LanguageModule,
    HardskillModule,
    SoftskillModule,
    forwardRef(() => ProjectModule),
    forwardRef(() => MatchModule),
  ],
  providers: [OpeningService, OpeningResolver],
  exports: [OpeningService,],
})
export class OpeningModule { }
