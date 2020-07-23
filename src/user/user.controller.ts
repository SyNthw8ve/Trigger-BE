import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dtos/create-User.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller("/user")
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    async new(@Body() registerUserDto: RegisterUserDto) {
        await this.userService.new(registerUserDto);
    }

    @Post("/update")
    async update(@Body() updateUserDto: UpdateUserDto) {
        await this.userService.update(updateUserDto);
    }

}
