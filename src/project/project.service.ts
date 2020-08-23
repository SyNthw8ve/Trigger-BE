import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Locale } from 'src/common/schemas/locale.schema';
import { LocationService } from 'src/common/location.service';
import { InstitutionService } from 'src/institution/institution.service';
import { Opening } from 'src/opening/schemas/opening.schema';
import { Phase } from 'src/phase/schemas/phase.schema';
import { UserService } from 'src/user/user.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { Project, ProjectStatus } from './schemas/project.schema';

@Injectable()
export class ProjectService {

    constructor(@InjectModel(Project.name) private projectModel: Model<Project>,
        private userService: UserService,
        private institutionService: InstitutionService,
        private locationService: LocationService) { }

    async new(createProjectDto: CreateProjectDto) {
        // TODO: validate this
        const location = await this.locationService.localeFromAdress(createProjectDto.locationAdress);

        // TODO: Is this assumption correct?
        const status = ProjectStatus.Open;

        // TODO: Is this assumption correct?
        const admins = [createProjectDto.manager];

        // TODO: Is this assumption correct?
        const currentTeam = [];

        // FIXME: We kinda lose typescript here?
        // A "fix" is to add : Project, saying that
        // data is a project, but then when don't implement
        // the "Document" part
        const data = {
            ...createProjectDto,
            location,
            status,
            admins,
            currentTeam
        };

        const createdProject = new this.projectModel(data);
        const savedProject = await createdProject.save();


        // TODO: Is this right?
        if (createProjectDto.institution) {
            this.institutionService.addProject(createProjectDto.institution, savedProject._id)
        } else {
            this.userService.addProject(createProjectDto.manager, savedProject._id);
        }

        return savedProject;
    }

    async addPhase(projectId: Project['_id'], phaseId: Phase['_id']) {
        // FIXME: handle wrong ids? 
        const project = await this.findWithId(projectId);
        project.phases.push(phaseId);
        project.save();
    }

    async findWithId(id: Project['_id']): Promise<Project> {
        return this.projectModel.findById(id);
    }
}
