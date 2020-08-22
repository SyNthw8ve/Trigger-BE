import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HardskillsService } from './hardskills.service';
import { LocationService } from './location.service';
import { Hardskill, HardskillSchema } from './schemas/hardskill.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Hardskill.name, schema: HardskillSchema }])],
    controllers: [],
    providers: [LocationService, HardskillsService],
    exports: [LocationService, HardskillsService]
})
export class CommonModule { }
