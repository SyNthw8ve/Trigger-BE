import { User } from "../schemas/user.schema";

export class RegisterUserDto {
    readonly name: User['name'];
    readonly email: User['email'];
    readonly password: User['password'];
    readonly hardSkills?: User['hardSkills'];
    readonly softSkills?: User['softSkills'];
    readonly languages?: User['languages'];
    readonly availability?: User['availability'];
    readonly interests?: User['interests'];
}