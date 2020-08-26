import { ProjectService } from './project.service';
import { ProjectResolver } from '././project.resolver';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas/project.schema';
import { InstitutionModule } from 'src/institution/institution.module';
import { UserModule } from 'src/user/user.module';
import { CommonModule } from 'src/common/common.module';
import { PhaseModule } from 'src/phase/phase.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    forwardRef(() => InstitutionModule),
    forwardRef(() => UserModule),
        CommonModule,
    forwardRef(() => PhaseModule)],
    providers: [
        ProjectService,
        ProjectResolver],
    exports: [ProjectService,],
})
export class ProjectModule { }
