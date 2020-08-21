import { Body, Controller, Post } from '@nestjs/common';
import { CreatePhaseDto } from './dtos/create-phase.dto';
import { PhaseService } from './phase.service';

@Controller("/project/phase")
export class PhaseController {

    constructor(private readonly phaseService: PhaseService) { }

    @Post()
    async new(@Body() createDto: CreatePhaseDto) {
        return this.phaseService.new(createDto);
    }

}
