import { Resolver, Query, Mutation, Args, Parent, ID, ResolveField } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { InstitutionService } from '../institution/institution.service';
import { Institution } from '../institution/schemas/institution.schema';
import { DraftProject } from './schemas/draft-project.schema';
import { DraftProjectDto } from './dtos/draft-project.dto';
import { DraftProjectService } from './draft-project.service';
import { DraftCreateOpening } from './schemas/draft-create-opening.schema';
import { HardskillService } from 'src/hardskill/hardskill.service';
import { LanguageService } from 'src/language/language.service';
import { SoftskillService } from 'src/softskill/softskill.service';
import { Language } from 'src/language/schemas/language.schema';
import { Softskill } from 'src/softskill/schemas/softskill.schema';
import { Hardskill } from 'src/hardskill/schemas/hardskill.schema';

@Resolver(of => DraftProject)
export class DraftProjectResolver {

    constructor(private readonly draftService: DraftProjectService,
        private readonly userService: UserService,
        private readonly institutionService: InstitutionService) { }

    @Mutation(returns => DraftProject)
    async saveDraft(@Args('draft') draft: DraftProjectDto): Promise<DraftProject> {
        return await this.draftService.new(draft);
    }

    @Query(returns => DraftProject)
    async getProjectDraft(@Args('id') id: String): Promise<DraftProject> {
        let p =  await this.draftService.findWithId(id);
        return p;
    }

    @ResolveField('initialTeam', returns => [User])
    async getTeam(@Parent() draft: DraftProject): Promise<User[]> {

        return await this.userService.findManyWithId(draft.initialTeam);
    }

    @ResolveField('manager', returns => User)
    async getManager(@Parent() draft: DraftProject): Promise<User> {

        return await this.userService.findWithId(draft.manager);
    }

    @ResolveField('institution', returns => Institution, { nullable: true })
    async getInstitution(@Parent() draft: DraftProject): Promise<Institution> {

        return await this.institutionService.findWithId(draft.institution);
    }

}


@Resolver(of => DraftCreateOpening)
export class DraftCreateOpeningResolver {

    constructor(
        private readonly softskillService: SoftskillService,
        private readonly hardSkillService: HardskillService,
        private readonly languageService: LanguageService,
    ) { }

    @ResolveField('hardskills', returns => [Hardskill])
    async getHardskills(@Parent() draftOpening: DraftCreateOpening): Promise<Hardskill[]> {
        return await this.hardSkillService.findManyById(draftOpening.hardskills);
    }

    @ResolveField('softskills', returns => [Softskill])
    async getSoftkills(@Parent() draftOpening: DraftCreateOpening): Promise<Softskill[]> {
        return await this.softskillService.findManyWithId(draftOpening.softskills);
    }

    @ResolveField('languages', returns => [Language])
    async getLanguages(@Parent() draftOpening: DraftCreateOpening): Promise<Language[]> {
        return await this.languageService.findManyById(draftOpening.languages);
    }
}