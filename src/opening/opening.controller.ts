import { Body, Controller, Post } from '@nestjs/common';
import { CreateOpeningDto } from './dtos/create-opening.dto';
import { OpeningService } from './opening.service';

@Controller("project/opening")
export class OpeningController {

    constructor(private readonly openingService: OpeningService) { }

    @Post()
    async new(@Body() createDto: CreateOpeningDto) {
        await this.openingService.new(createDto);
    }

}
