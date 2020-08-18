import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { CreateInstitutionDto } from './dtos/create-institution.dto';
import { InstitutionService } from './institution.service';

@Controller("/institution")
export class InstitutionController {

    constructor(private readonly institutionService: InstitutionService) { }

    @Post()
    async new(@Body() registerInstitution: CreateInstitutionDto) {
        await this.institutionService.new(registerInstitution);
    }

    // @Put("/update")
    // async update(@Body() updateUserDto: UpdateUserDto) {
    //     await this.userService.update(updateUserDto);
    // }

}
