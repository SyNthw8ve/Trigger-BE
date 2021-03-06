import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Parent, ID, ResolveField } from '@nestjs/graphql';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectService } from './project.service';
import { Project } from './schemas/project.schema';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { InstitutionService } from '../institution/institution.service';
import { Institution } from '../institution/schemas/institution.schema';
import { PhaseService } from '../phase/phase.service';
import { Phase } from '../phase/schemas/phase.schema';

@Resolver(of => Project)
export class ProjectResolver {

    constructor(private readonly projectService: ProjectService,
        private readonly userService: UserService,
        private readonly institutionService: InstitutionService,
        private readonly phaseService: PhaseService) { }
        
    @Mutation(returns => Project)
    async newProject(@Args('project') project: CreateProjectDto): Promise<Project> {

        return await this.projectService.new(project);
    }

    @Query(returns => Project)
    async getProject(@Args('id') id: String) : Promise<Project> {

        return await this.projectService.findWithId(id);
    }

    @ResolveField('currentTeam' , returns => [User])
    async getTeam(@Parent() project: Project) : Promise<User[]> {

        return await this.userService.findManyWithId(project.currentTeam);
    }

    @ResolveField('admins' , returns => [User])
    async getAdmins(@Parent() project: Project) : Promise<User[]> {

        return await this.userService.findManyWithId(project.admins);
    }

    @ResolveField('manager', returns => User)
    async getManager(@Parent() project: Project) : Promise<User> {

        return await this.userService.findWithId(project.manager);
    }

    @ResolveField('institution', returns => Institution, { nullable: true })
    async getInstitution(@Parent() project: Project) : Promise<Institution> {

        return await this.institutionService.findWithId(project.institution);
    }

    @ResolveField('phases', returns => [Phase])
    async getPhases(@Parent() project: Project) : Promise<Phase[]> {

        return await this.phaseService.getManyWithId(project.phases);
    }

}
