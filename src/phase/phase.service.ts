import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/common/dtos/task';
import { OpeningService } from 'src/opening/opening.service';
import { ParticipationService } from 'src/participation/participation.service';
import { Participation } from 'src/participation/schemas/participation.schema';
import { ProjectService } from 'src/project/project.service';
import { CreatePhaseDto } from './dtos/create-phase.dto';
import { Phase } from './schemas/phase.schema';

@Injectable()
export class PhaseService {

    constructor(@InjectModel(Phase.name) private model: Model<Phase>,
        private projectService: ProjectService,
        private participationService: ParticipationService,
        private openingService: OpeningService) { }

    async new(createDto: CreatePhaseDto): Promise<Phase> {
        // TODO: validate this

        const { project, openingsAndTasks, ...rest } = createDto;

        let created = new this.model(rest);

        const participations = await this.createParticipations(created, openingsAndTasks);
        created.participations = participations;

        this.projectService.addPhase(project, created._id);

        this.putParticipationsInOpenings(openingsAndTasks, participations);

        return created;
    }


    async createParticipations(phase: Phase, openingsAndTasks: CreatePhaseDto['openingsAndTasks']) {

        return Promise.all(openingsAndTasks.map(async value => {
            return await this.participationService.new({ opening: value.opening, phase: phase._id, tasks: value.tasks })
        }));

    }

    async putParticipationsInOpenings(openingsAndTasks: CreatePhaseDto['openingsAndTasks'], participations: Participation[]) {

        return Promise.all(openingsAndTasks.map(async (value, index) => {
            return await this.openingService.addParticipation(value.opening, participations[index]._id);
        }));

    }

}
