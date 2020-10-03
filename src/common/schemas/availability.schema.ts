import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectType, InputType, Field, Float, registerEnumType } from "@nestjs/graphql";

export enum AvailabilityType {
    FullTime = "full-time",
    PartTime = "part-time",
    Hours = "hours",
}

registerEnumType(AvailabilityType, { name: 'AvailabilityType' });


@ObjectType()
@Schema()
export class Availability {

    @Field(type => AvailabilityType,{ nullable: false })
    @Prop({ type: AvailabilityType, required: true })
    type: AvailabilityType;

    @Field(type => Float, { nullable: true })
    @Prop({ type: Number, required: false })
    hours?: number;
}



export const AvailabilitySchema = SchemaFactory.createForClass(Availability);