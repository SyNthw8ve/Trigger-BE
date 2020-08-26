import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateSoftskillDto } from './dtos/create-softskill.dto';
import { SoftskillService } from './softskill.service';
import { Softskill } from './schemas/softskill.schema';

@Resolver(of => Softskill)
export class SoftskillResolver {

    constructor(private readonly softskillService: SoftskillService) { }

    @Query(returns => [Softskill])
    async getSoftskills() : Promise<Softskill[]> {

        return await this.softskillService.getAll();
    }

    @Mutation(returns => Softskill)
    async newSoftskill(@Args('softskill') softskill: CreateSoftskillDto) : Promise<Softskill> {

        return await this.softskillService.new(softskill);
    }

}
