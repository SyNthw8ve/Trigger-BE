import { User } from "../schemas/user.schema";

export class RegisterUserDto {
    readonly name: User['name'];
    readonly email: User['email'];
    readonly password: User['password'];
}