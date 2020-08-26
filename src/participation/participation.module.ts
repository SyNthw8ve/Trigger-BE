import { ParticipationService } from './participation.service';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Participation, ParticipationSchema } from './schemas/participation.schema';
import { OpeningModule } from 'src/opening/opening.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Participation.name, schema: ParticipationSchema }]),
    forwardRef(() => OpeningModule)],
    controllers: [],
    providers: [
        ParticipationService,],
    exports: [ParticipationService,],
})
export class ParticipationModule { }
