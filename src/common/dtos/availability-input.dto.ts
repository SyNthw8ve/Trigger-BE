import { AvailabilityType } from '../schemas/availability.schema';
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class AvailabilityInput {

    @Field(type => AvailabilityType,{ nullable: false })
    type: AvailabilityType;

    @Field(type => Float, { nullable: true })
    hours?: number;
}