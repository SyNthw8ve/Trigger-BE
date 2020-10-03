import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Locale } from 'src/common/schemas/locale.schema';
import { LocationService } from 'src/common/location.service';
import { InstitutionService } from 'src/institution/institution.service';
import { Opening } from 'src/opening/schemas/opening.schema';
import { UserService } from 'src/user/user.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { Project, ProjectStatus } from './schemas/project.schema';
import { OpeningService } from 'src/opening/opening.service';

@Injectable()
export class ProjectService {

    constructor(@InjectModel(Project.name) private projectModel: Model<Project>,
        private userService: UserService,
        private institutionService: InstitutionService,
        private openingService: OpeningService,
        private locationService: LocationService) { }

    async new(createProjectDto: CreateProjectDto) {
        // TODO: validate this

        // TODO: Is this assumption correct?
        const status = ProjectStatus.Open;

        // TODO: Is this assumption correct?
        const admins = [createProjectDto.manager];

        // TODO: Is this assumption correct?
        let { initialTeam, ...noTeam } = createProjectDto;
        const currentTeam = initialTeam || [];

        let { opening_creations, ...rest } = noTeam

        // FIXME: We kinda lose typescript here?
        // A "fix" is to add : Project, saying that
        // data is a project, but then when don't implement
        // the "Document" part
        const data = {
            ...rest,
            status,
            admins,
            currentTeam,
            openings: []
        };

        const createdProject = new this.projectModel(data);

        const opening_ids = await Promise.all(opening_creations.map(dto =>
            this.openingService.new(dto, createdProject.id).then(o => o.id)
        ));

        // TODO: Is this right?
        if (createProjectDto.institution) {
            this.institutionService.addProject(createProjectDto.institution, createdProject.id)
        } else {
            this.userService.addProject(createProjectDto.manager, createdProject.id);
        }

        createdProject.openings = opening_ids

        return createdProject.save();
    }

    async findWithId(id: Project['_id']): Promise<Project> {

        return this.projectModel.findById(id);
    }

    async findDraftWithId(id: Project['_id']): Promise<Project> {

        return this.projectModel.findById(id);
    }

    async findManyWithId(ids: Project['_id'][]): Promise<Project[]> {

        return await this.projectModel.find({ _id: { $in: ids } });
    }
}
