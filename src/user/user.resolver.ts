import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { RegisterUserDto } from './dtos/create-User.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './schemas/user.schema';

@Resolver(of => User)
export class UserResolver {

    constructor(private readonly userService: UserService) { }

    /* @Post()
    async new(@Body() registerUserDto: RegisterUserDto) {
        return this.userService.new(registerUserDto);
    }

    @Put("/update")
    async update(@Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(updateUserDto);
    } */

    @Query(returns => [User])
    async getUsers() : Promise<User[]> {

        return await this.userService.getUsers();
    }

    @Mutation(returns => User)
    async newUser(@Args('user') user: RegisterUserDto) : Promise<User> {

        return await this.userService.new(user);
    }
    
    @Mutation(returns => User)
    async updateUser(@Args('user') user: UpdateUserDto) : Promise<User> {

        return await this.userService.update(user);
    }

}
