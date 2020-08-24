import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateHardskillDto } from './dtos/create-hardskill.dto';
import { HardskillService } from './hardskill.service';
import { Hardskill } from './schemas/hardskill.schema';

@Resolver(of => Hardskill)
export class HardskillResolver {

    constructor(private readonly hardskillService: HardskillService) { }

    @Query(returns => [Hardskill])
    async getHardSkills(): Promise<Hardskill[]> {

        return await this.hardskillService.find_all();
    }

    @Mutation(returns => Hardskill)
    async registerHardSkill(@Args('skill') skill: CreateHardskillDto): Promise<CreateHardskillDto> {

        return await this.hardskillService.new(skill);
    }

    @Mutation(returns => [Hardskill])
    async registerMutlipleHardSkills(@Args({ name: 'skills', type: () => [CreateHardskillDto] }) skills: [CreateHardskillDto]):
        Promise<CreateHardskillDto[]> {

        return await this.hardskillService.many_new(skills);
    }
}
