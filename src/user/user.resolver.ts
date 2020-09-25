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
import { InsertionResult } from './dtos/insertion-result.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MatchService } from 'src/match/match.service';

@Resolver(of => User)
export class UserResolver {

    constructor(private readonly userService: UserService,
        private readonly projectService: ProjectService,
        private readonly institutionService: InstitutionService,
        private readonly hardskillService: HardskillService,
        private readonly softskillService: SoftskillService,
        private readonly languageService: LanguageService,
        private readonly matchService: MatchService) { }

    //@UseGuards(JwtAuthGuard)
    @Query(returns => [User])
    async getUsers(): Promise<User[]> {

        return await this.userService.getUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Query(returns => User)
    async getUser(@Args('email') email: string): Promise<User> {

        return await this.userService.findWithEmail(email);
    }

    @Mutation(returns => InsertionResult)
    async newUser(@Args('user') user: RegisterUserDto): Promise<InsertionResult> {

        let result = await this.userService.new(user);

        if (result.success) {
            this.matchService.onUserCreated(result._id);
        }

        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(returns => User)
    async updateUser(@Args('user') user: UpdateUserDto): Promise<User> {

        let result = await this.userService.update(user);;
        this.matchService.onUserCreated(result._id);
        return result;
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
        return await this.softskillService.findWithId(softSkill);
    }
}
