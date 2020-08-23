import { Body, Controller, Post } from '@nestjs/common';
import { CreateSoftskillDto } from './dtos/create-softskill.dto';
import { SoftskillService } from './softskill.service';
import { Softskill } from './schemas/softskill.schema';

@Controller("softskill")
export class SoftskillController {

    constructor(private readonly hardskillService: SoftskillService) { }

    @Post()
    async new(@Body() registerHardSkill: CreateSoftskillDto): Promise<Softskill> {
        return this.hardskillService.new(registerHardSkill);
    }

}
