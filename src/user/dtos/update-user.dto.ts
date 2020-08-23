import { User } from "../schemas/user.schema";
import { RegisterUserDto } from "./create-User.dto";

import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto extends RegisterUserDto {

    @Field(type => ID, { nullable: false })
    readonly id: User['_id'];
}