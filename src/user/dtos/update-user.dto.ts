import { User } from "../schemas/user.schema";
import { RegisterUserDto } from "./create-User.dto";

export class UpdateUserDto extends RegisterUserDto {
    readonly id: User['_id'];
}