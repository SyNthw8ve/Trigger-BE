import { CreateHardskillDto } from "src/common/dtos/create-hardskill.dto";
import { Hardskill } from "src/common/schemas/hardskill.schema";
import { User } from "../schemas/user.schema";

export class RegisterUserDto {
    readonly name: User['name'];
    readonly email: User['email'];
    readonly password: User['password'];
    readonly hardSkills?: User['hardSkills'];
    readonly softSkills?: User['softSkills'];
    readonly languages?: User['languages'];
}