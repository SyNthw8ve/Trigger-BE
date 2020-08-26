import { CreateInstitutionDto } from './dtos/create-institution.dto';
import { InstitutionService } from './institution.service';
import { Resolver, Query, Mutation, ResolveField, Args, Parent } from '@nestjs/graphql';
import { Institution } from './schemas/institution.schema';
import { UserService } from 'src/user/user.service';
import { User }  from '../user/schemas/user.schema';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/schemas/project.schema';

@Resolver(of => Institution)
export class InstitutionResolver {

    constructor(private readonly institutionService: InstitutionService,
        private readonly userService: UserService,
        private readonly projectService: ProjectService) { }


    @Query(returns => [Institution])
    async getInstitutions() : Promise<Institution[]> {

        return await this.institutionService.getInstitutions();
    }

    @Mutation(returns => Institution)
    async newInstitution(@Args('institution') institution: CreateInstitutionDto): Promise<Institution> {

        return await this.institutionService.new(institution);
    }

    @ResolveField('creator', returns => User)
    async getCreator(@Parent() institution: Institution) : Promise<User> {

        return await this.userService.findWithId(institution.creator);
    }

    @ResolveField('projects', returns => [Project])
    async getProjects(@Parent() institution: Institution) : Promise<Project[]> {

        return await this.projectService.findManyWithId(institution.projects);
    }

}
