import { Body, Controller, Post } from '@nestjs/common';
import { CreateHardskillDto } from './dtos/create-hardskill.dto';
import { HardskillService } from './hardskill.service';
import { Hardskill } from './schemas/hardskill.schema';

@Controller("hardskill")
export class HardskillController {

    constructor(private readonly hardskillService: HardskillService) { }

    @Post()
    async new(@Body() registerHardSkills: CreateHardskillDto): Promise<Hardskill> {
        return this.hardskillService.new(registerHardSkills);
    }

}
