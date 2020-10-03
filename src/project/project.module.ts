import { ProjectService } from './project.service';
import { ProjectResolver } from '././project.resolver';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas/project.schema';
import { InstitutionModule } from 'src/institution/institution.module';
import { UserModule } from 'src/user/user.module';
import { CommonModule } from 'src/common/common.module';
import { DraftProject, DraftProjectSchema } from './schemas/draft-project.schema';
import { DraftProjectResolver } from './draft-project.resolver';
import { DraftProjectService } from './draft-project.service';
import { OpeningModule } from 'src/opening/opening.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([{ name: DraftProject.name, schema: DraftProjectSchema }]),
    forwardRef(() => InstitutionModule),
    forwardRef(() => UserModule),
        CommonModule,
        OpeningModule
    ],
    providers: [
        ProjectService,
        ProjectResolver,
        DraftProjectService,
        DraftProjectResolver],
    exports: [ProjectService,],
})
export class ProjectModule { }
