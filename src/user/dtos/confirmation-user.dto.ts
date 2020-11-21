import { InputType, Field, ID } from '@nestjs/graphql';
import { User } from '../schemas/user.schema';

@InputType()
export class ConfirmationUserDto {

    @Field(type => ID, { nullable: false })
    readonly userId: User['_id'];

    @Field(type => String, { nullable: false })
    readonly confirmationData: string;
}