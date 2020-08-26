import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas/project.schema';
import { InstitutionModule } from 'src/institution/institution.module';
import { UserModule } from 'src/user/user.module';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
        forwardRef(() => InstitutionModule),
        forwardRef(() => UserModule),
        CommonModule],
    controllers: [
        ProjectController,],
    providers: [
        ProjectService,],
    exports: [ProjectService,],
})
export class ProjectModule { }
