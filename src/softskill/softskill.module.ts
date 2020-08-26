import { SoftskillResolver } from './softskill.resolver';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SoftskillService } from './softskill.service';
import { Softskill, SoftskillSchema } from './schemas/softskill.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Softskill.name, schema: SoftskillSchema }])],
    providers: [SoftskillService, SoftskillResolver],
    exports: [SoftskillService]
})
export class SoftskillModule { }
