import { UserController } from './user/user.controller';
import { ProjectModule } from './project/project.module';
import { InstitutionModule } from './institution/institution.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProjectModule,
    InstitutionModule,
    CommonModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
