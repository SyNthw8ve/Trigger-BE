import { User } from "../schemas/user.schema";

export class RegisterUserDto {
    readonly name: User['name'];
}