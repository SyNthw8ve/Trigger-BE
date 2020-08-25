import { SoftskillController } from './softskill.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SoftskillService } from './softskill.service';
import { Softskill, SoftskillSchema } from './schemas/softskill.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Softskill.name, schema: SoftskillSchema }])],
    controllers: [SoftskillController,],
    providers: [SoftskillService],
    exports: [SoftskillService]
})
export class SoftskillModule { }
