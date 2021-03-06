import { OpeningResolver } from './opening.resolver';
import { OpeningService } from './opening.service';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Opening, OpeningSchema } from './schemas/opening.schema';
import { LanguageModule } from 'src/language/language.module';
import { HardskillModule } from 'src/hardskill/hardskill.module';
import { SoftskillModule } from 'src/softskill/softskill.module';
import { ProjectModule } from 'src/project/project.module';
import { ParticipationModule } from 'src/participation/participation.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Opening.name, schema: OpeningSchema }]),
    LanguageModule, HardskillModule, SoftskillModule,
    forwardRef(() => ProjectModule),
    forwardRef(() => ParticipationModule)],
  providers: [
    OpeningService, OpeningResolver],
  exports: [OpeningService,],
})
export class OpeningModule { }
