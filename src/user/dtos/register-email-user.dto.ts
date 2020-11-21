import { User } from "../schemas/user.schema";

import { InputType, Field, ID } from '@nestjs/graphql';


@InputType()
export class RegisterEmailUserDto {

    @Field(type => String, { nullable: false })
    readonly email: User['email'];

    @Field(type => String, { nullable: false })
    readonly password: User['password'];

    // FIXME: Is this string? What is this?
    @Field(type => String, { nullable: true })
    readonly emailCode?: string;
}