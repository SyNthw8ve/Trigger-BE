import { ServermatchModule } from './servermatch/servermatch.module';
import { HardskillModule } from './hardskill/hardskill.module';
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
import { NotificationsModule } from './notifications/notifications.module';
import { EmailModule } from './email/email.module';
import { FlaskModule } from './flask/flask.module';
import { OpeningModule } from './opening/opening.module';
import { SoftQuizModule } from './soft-quiz/soft-quiz.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    ServermatchModule,
    HardskillModule,
    LanguageModule,
    SoftskillModule,
    OpeningModule,
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
    AuthModule,
    NotificationsModule,
    EmailModule,
    FlaskModule,
    CourseModule,
    SoftQuizModule],
  providers: [AppService, AppResolver],
})
export class AppModule { }
