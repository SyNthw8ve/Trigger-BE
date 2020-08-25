import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { RegisterUserDto } from './dtos/create-User.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserSoftskill } from './schemas/user.schema';
import { Project } from 'src/project/schemas/project.schema';
import { ProjectService } from 'src/project/project.service';
import { Institution } from 'src/institution/schemas/institution.schema';
import { InstitutionService } from 'src/institution/institution.service';
import { Hardskill } from 'src/hardskill/schemas/hardskill.schema';
import { HardskillService } from 'src/hardskill/hardskill.service';
import { Language } from 'src/language/schemas/language.schema';
import { LanguageService } from 'src/language/language.service';
import { Softskill } from 'src/softskill/schemas/softskill.schema';
import { SoftskillService } from 'src/softskill/softskill.service';

@Resolver(of => User)
export class UserResolver {

    constructor(private readonly userService: UserService,
        private readonly projectService: ProjectService,
        private readonly institutionService: InstitutionService,
        private readonly hardskillService: HardskillService,
        private readonly softskillService: SoftskillService,
        private readonly languageService: LanguageService) { }

    @Query(returns => [User])
    async getUsers(): Promise<User[]> {

        return await this.userService.getUsers();
    }

    @Mutation(returns => User)
    async newUser(@Args('user') user: RegisterUserDto): Promise<User> {

        return await this.userService.new(user);
    }

    @Mutation(returns => User)
    async updateUser(@Args('user') user: UpdateUserDto): Promise<User> {

        return await this.userService.update(user);
    }

    @ResolveField('projects', returns => [Project])
    async getUserProjects(@Parent() user: User): Promise<Project[]> {

        const projects = user.projects;
        return await this.projectService.findManyWithId(projects);
    }

    @ResolveField('institution', returns => Institution, { nullable: true })
    async getUserInstitution(@Parent() user: User): Promise<Institution> {

        const institution = user.institution;
        return await this.institutionService.findWithId(institution);
    }

    @ResolveField('hardSkills', returns => [Hardskill])
    async getUserHardSkills(@Parent() user: User): Promise<Hardskill[]> {

        const hardSkills = user.hardSkills;
        return await this.hardskillService.findManyById(hardSkills);
    }

    @ResolveField('languages', returns => [Language])
    async getUserLanguages(@Parent() user: User): Promise<Language[]> {

        const languages = user.languages;
        return await this.languageService.findManyById(languages);
    }

}

@Resolver(of => UserSoftskill)
export class UserSoftskillResolver {

    constructor(
        private readonly softskillService: SoftskillService,
    ) { }

    @ResolveField('softskillId', returns => Softskill)
    async getUserSoftSkills(@Parent() softskill: UserSoftskill): Promise<Softskill> {

        const softSkill = softskill.softskillId;
        return await this.softskillService.findWithId(softskill);
    }
}
