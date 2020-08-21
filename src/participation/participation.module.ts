import { ParticipationService } from './participation.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Participation, ParticipationSchema } from './schemas/participation.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Participation.name, schema: ParticipationSchema }])],
    controllers: [],
    providers: [
        ParticipationService,],
    exports: [ParticipationService,],
})
export class ParticipationModule { }
