import { Body, Controller, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectService } from './project.service';

@Controller("/project")
export class ProjectController {

    constructor(private readonly projectService: ProjectService) { }

    @Post()
    async new(@Body() createProjectDto: CreateProjectDto) {
        await this.projectService.new(createProjectDto);
    }

    // @Put("/update")
    // async update(@Body() updateUserDto: UpdateUserDto) {
    //     await this.userService.update(updateUserDto);
    // }


}
