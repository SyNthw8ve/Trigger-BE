import { CreatePhaseDto } from './dtos/create-phase.dto';
import { PhaseService } from './phase.service';
import { Phase } from './schemas/phase.schema';
import { Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ParticipationService } from 'src/participation/participation.service';
import { Participation } from 'src/participation/schemas/participation.schema';

@Resolver(of => Phase)
export class PhaseResolver {

    constructor(private readonly phaseService: PhaseService,
        private readonly participationService: ParticipationService) { }

    @Mutation(returns => Phase)
    async createPhase(@Args('phase') phase: CreatePhaseDto) : Promise<Phase> {

        return this.phaseService.new(phase);
    }

    @ResolveField('participations', returns => [Participation])
    async getParticipations(@Parent() phase: Phase) : Promise<Participation[]> {

        return this.participationService.findManyWithId(phase.participations);
    }

}
