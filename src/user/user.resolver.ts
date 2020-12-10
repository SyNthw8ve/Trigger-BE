import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './schemas/user.schema';
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
import { UserSoftskill } from './schemas/user-softskill.schema';
import { UserHardskill } from './schemas/user-hardskill.schema';
import { UserLanguage } from './schemas/user-language.schema';
import { UserLearning } from './schemas/user-learning.schema';
import { CourseService } from 'src/course/course.service';
import { Course } from 'src/course/schemas/course.schema';
import { UserExperience } from './schemas/user-experience.schema';
import { RegisterEmailUserDto } from './dtos/register-email-user.dto';
import { ConfirmationUserRequestDto } from './dtos/confirmation-user-request.dto';
import { ConfirmationUserDto } from './dtos/confirmation-user.dto';
import { ConfirmationResult } from './dtos/confirmation-result.dto';
import { CommunicateUserFinishedProfileDto } from './dtos/user-finished-profile';

@Resolver(of => User)
export class UserResolver {

    constructor(private readonly userService: UserService,
        private readonly projectService: ProjectService,
        private readonly institutionService: InstitutionService,
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
    async newUser(@Args('user') user: RegisterEmailUserDto): Promise<InsertionResult> {

        let result = await this.userService.new(user);

        if (result.success) {
            this.matchService.attendToUserCreated(result._id);
        }

        return result;
    }

    @Mutation(returns => Boolean)
    async communicateConfirmationRequest(@Args('confirmationRequest') confirmationRequest: ConfirmationUserRequestDto): Promise<Boolean> {
        return this.userService.attendToConfirmationRequest(confirmationRequest);
    }

    @Mutation(returns => ConfirmationResult)
    async communicateConfirmation(@Args('confirmation') confirmation: ConfirmationUserDto): Promise<ConfirmationResult> {
        return this.userService.attendToConfirmation(confirmation);
    }

    //@UseGuards(LocalAuthGuard)
    @Mutation(returns => Boolean)
    async communicateFinishedProfile(@Args('user') user: CommunicateUserFinishedProfileDto): Promise<boolean> {
        let result = await this.userService.attendToUserFinishedProfile(user);
        return result;
    }

    //@UseGuards(LocalAuthGuard)
    @Mutation(returns => User)
    async updateUser(@Args('user') user: UpdateUserDto): Promise<User> {

        let result = await this.userService.update(user);
        this.matchService.attendToUserUpdated(result._id);
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

@Resolver(of => UserHardskill)
export class UserHardskillResolver {

    constructor(
        private readonly hardskillService: HardskillService,
        private readonly userService: UserService,
    ) { }

    @ResolveField('hardskillId', returns => Hardskill)
    async getUserHardSkills(@Parent() hardskill: UserHardskill): Promise<Hardskill> {

        return await this.hardskillService.findWithId(hardskill.hardskillId);
    }

    @ResolveField('recommendedBy', returns => [User])
    async getRecommended(@Parent() hardskill: UserHardskill): Promise<User[]> {

        return await this.userService.findManyWithId(hardskill.recommendedBy);
    }
}

@Resolver(of => UserLanguage)
export class UserLanguageResolver {

    constructor(
        private readonly languageService: LanguageService,
    ) { }

    @ResolveField('languageId', returns => Language, { nullable: true })
    async getUserLanguages(@Parent() language: UserLanguage): Promise<Language> {

        if (language.languageId) {
            return await this.languageService.findWithId(language.languageId);
        }
        return null;
    }
}

@Resolver(of => UserLearning)
export class UserLearningResolver {

    constructor(
        private readonly courseService: CourseService,
    ) { }

    @ResolveField('courseId', returns => Course)
    async getCourse(@Parent() learning: UserLearning): Promise<Course> {

        return await this.courseService.findWithId(learning.courseId);
    }
}

@Resolver(of => UserExperience)
export class UserExperienceResolver {

    constructor(
        private readonly institutionService: InstitutionService,
    ) { }

    @ResolveField('company', returns => Institution, { nullable: true })
    async getCourse(@Parent() experience: UserExperience): Promise<Institution | null> {
        if (experience.company) {
            return await this.institutionService.findWithId(experience.company);
        }

        return null;
    }
}