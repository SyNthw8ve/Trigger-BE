import { HardskillModule } from './hardskill/hardskill.module';
import { ParticipationModule } from './participation/participation.module';
import { PhaseModule } from './phase/phase.module';
import { ProjectModule } from './project/project.module';
import { InstitutionModule } from './institution/institution.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { connectionString } from './config'
import { LanguageModule } from './language/language.module';
import { SoftskillModule } from './softskill/softskill.module';

@Module({
  imports: [
    HardskillModule,
    LanguageModule,
    SoftskillModule,
    ParticipationModule,
    PhaseModule,
    ProjectModule,
    InstitutionModule,
    CommonModule,
    UserModule,
    MongooseModule.forRoot(connectionString),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
