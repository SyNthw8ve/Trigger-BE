import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

export enum Description {

    OK,
    EMAIL_IN_USE
}

registerEnumType(Description, { name: 'Description' });

@ObjectType()
export class InsertionResult {

    @Field(type => Boolean, { nullable: false })
    success: boolean;

    @Field(type => Description, { nullable: false })
    description: Description;
}