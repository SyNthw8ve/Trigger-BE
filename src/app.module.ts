import { HardskillModule } from './hardskill/hardskill.module';
import { ParticipationModule } from './participation/participation.module';
import { PhaseModule } from './phase/phase.module';
import { ProjectModule } from './project/project.module';
import { InstitutionModule } from './institution/institution.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

import { connectionString } from './config'
import { LanguageModule } from './language/language.module';
import { SoftskillModule } from './softskill/softskill.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

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
    MongooseModule.forRoot(connectionString),
    GraphQLModule.forRoot(
      {
        debug: true, 
        playground: true, 
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        context: ({ req }) => ({ req }),
      }),
    AuthModule],
  providers: [AppService, AppResolver],
})
export class AppModule { }
