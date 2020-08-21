import { OpeningController } from './opening.controller';
import { OpeningService } from './opening.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Opening, OpeningSchema } from './schemas/opening.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Opening.name, schema: OpeningSchema }])],
  controllers: [
    OpeningController,],
  providers: [
    OpeningService,],
  exports: [OpeningService,],
})
export class OpeningModule { }
