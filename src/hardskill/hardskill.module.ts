import { HardskillController } from './hardskill.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HardskillService } from './hardskill.service';
import { Hardskill, HardskillSchema } from './schemas/hardskill.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Hardskill.name, schema: HardskillSchema }])],
    controllers: [
        HardskillController,],
    providers: [HardskillService],
})
export class HardskillModule { }
