import { User } from "../schemas/user.schema";

export class UpdateUserDto {
    readonly id: User['_id'];
    readonly name?: User['name'];
    readonly interests?: User['interests'];
}