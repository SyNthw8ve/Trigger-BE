import { PhaseService } from './phase.service';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Phase, PhaseSchema } from './schemas/phase.schema';
import { PhaseResolver } from './phase.resolver';
import { ProjectModule } from 'src/project/project.module';
import { ParticipationModule } from 'src/participation/participation.module';
import { OpeningModule } from 'src/opening/opening.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Phase.name, schema: PhaseSchema }]),
    forwardRef(() => ProjectModule),
    forwardRef(() => ParticipationModule),
    forwardRef(() => OpeningModule)],
    providers: [
        PhaseService, PhaseResolver],
    exports: [PhaseService]
})
export class PhaseModule { }
