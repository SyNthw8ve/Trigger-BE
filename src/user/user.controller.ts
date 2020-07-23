import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/create-User.dto';

@Controller("/user")
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() registerUserDto: RegisterUserDto) {
        await this.userService.new(registerUserDto);
    }

}
