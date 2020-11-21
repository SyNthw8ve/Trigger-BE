import { ObjectType, Field, registerEnumType, ID } from '@nestjs/graphql';

export enum ConfirmationDescription {
    Ok,
    AlreadyConfirmed,
    Wrong,
}

registerEnumType(ConfirmationDescription, { name: 'ConfirmationDescription' });

@ObjectType()
export class ConfirmationResult {

    @Field(type => Boolean, { nullable: false })
    present: boolean;

    @Field(type => ConfirmationDescription, { nullable: false })
    description: ConfirmationDescription;
}