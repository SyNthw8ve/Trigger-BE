import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas/project.schema';
import { InstitutionModule } from 'src/institution/institution.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
        InstitutionModule,
        UserModule],
    controllers: [
        ProjectController,],
    providers: [
        ProjectService,],
    exports: [ProjectService,],
})
export class ProjectModule { }
