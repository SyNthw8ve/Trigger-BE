import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectService } from './project.service';
import { Project } from './schemas/project.schema';

@Controller("/project")
export class ProjectController {

    constructor(private readonly projectService: ProjectService) { }

    @Post()
    async new(@Body() createProjectDto: CreateProjectDto) {
        return this.projectService.new(createProjectDto);
    }

    @Get(':id')
    async findOne(@Param() params): Promise<Project> {
        return this.projectService.findWithId(params.id);
    }

    // @Put("/update")
    // async update(@Body() updateUserDto: UpdateUserDto) {
    //     await this.userService.update(updateUserDto);
    // }


}
