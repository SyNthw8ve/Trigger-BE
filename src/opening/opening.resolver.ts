import { CreateOpeningDto } from './dtos/create-opening.dto';
import { OpeningService } from './opening.service';
import { Resolver, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Opening } from './schemas/opening.schema';
import { LanguageService } from 'src/language/language.service';
import { HardskillService } from 'src/hardskill/hardskill.service';
import { SoftskillService } from 'src/softskill/softskill.service';
import { ProjectService } from 'src/project/project.service';

import { Language } from 'src/language/schemas/language.schema';
import { Softskill } from 'src/softskill/schemas/softskill.schema';
import { Hardskill } from 'src/hardskill/schemas/hardskill.schema';
import { Project } from 'src/project/schemas/project.schema';
import { MatchService } from 'src/match/match.service';

@Resolver(of => Opening)
export class OpeningResolver {

    constructor(private readonly openingService: OpeningService,
        private readonly languageService: LanguageService,
        private readonly hardskillService: HardskillService,
        private readonly softskillService: SoftskillService,
        private readonly projectService: ProjectService,
        private readonly matchService: MatchService) { }

    @Mutation(returns => Opening)
    async newOpening(
        @Args('opening') opening: CreateOpeningDto,
        @Args('project') project: String
    ): Promise<Opening> {

        let result = await this.openingService.new(opening, project);

        this.matchService.attendToOpeningCreated(result.id);

        return result
    }

    @ResolveField('languages', returns => [Language])
    async getLanguages(@Parent() opening: Opening) : Promise<Language[]> {

        return await this.languageService.findManyById(opening.languages);
    }

    @ResolveField('softskills', returns => [Softskill])
    async getSoftSkills(@Parent() opening: Opening) : Promise<Softskill[]> {

        return await this.softskillService.findManyWithId(opening.softskills);
    }

    @ResolveField('hardskills', returns => [Hardskill])
    async getHardSkills(@Parent() opening: Opening) : Promise<Hardskill[]> {

        return await this.hardskillService.findManyById(opening.hardskills);
    }

    @ResolveField('project', returns => Project)
    async getProject(@Parent() opening: Opening) : Promise<Project> {

        return await this.projectService.findWithId(opening.project);
    }
}
