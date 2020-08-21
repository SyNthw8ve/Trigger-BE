import { PhaseService } from './phase.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Phase, PhaseSchema } from './schemas/phase.schema';
import { PhaseController } from './phase.controller';
import { ProjectModule } from 'src/project/project.module';
import { ParticipationModule } from 'src/participation/participation.module';
import { OpeningModule } from 'src/opening/opening.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Phase.name, schema: PhaseSchema }]),
        ProjectModule,
        ParticipationModule,
        OpeningModule],
    controllers: [PhaseController],
    providers: [
        PhaseService,]
})
export class PhaseModule { }
