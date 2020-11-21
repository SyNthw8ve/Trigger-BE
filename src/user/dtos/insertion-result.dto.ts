import { ObjectType, Field, registerEnumType, ID } from '@nestjs/graphql';
import { User } from '../schemas/user.schema';

export enum Description {
    OK,
    OK_BUT_INVALID_CODE,
    EMAIL_IN_USE,
}

registerEnumType(Description, { name: 'Description' });

@ObjectType()
export class InsertionResult {

    @Field(type => Boolean, { nullable: false })
    success: boolean;

    @Field(type => Description, { nullable: false })
    description: Description;

    @Field(type => ID, { nullable: true })
    _id?: User['_id'];
}