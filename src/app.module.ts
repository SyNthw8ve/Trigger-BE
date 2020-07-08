import { ProjectModule } from './project/project.module';
import { InstitutionModule } from './institution/institution.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ProjectModule,
    InstitutionModule,
    CommonModule,
    UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
