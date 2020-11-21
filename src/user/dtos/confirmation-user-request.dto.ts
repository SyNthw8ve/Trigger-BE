import { InputType, Field, ID, createUnionType, registerEnumType } from '@nestjs/graphql';
import { User } from '../schemas/user.schema';


export enum ConfirmationType {
    Email,
    Phone,
}

registerEnumType(
    ConfirmationType,
    { name: 'ConfirmationType' }
);

@InputType()
export class ConfirmationUserRequestDto {

    @Field(type => ID, { nullable: false })
    readonly userId: User['_id'];

    @Field(type => ConfirmationType, { nullable: false })
    readonly confirmationType: ConfirmationType;

    @Field(type => String, { nullable: true })
    readonly phoneNumber?: string;
}