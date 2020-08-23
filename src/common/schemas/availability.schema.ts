import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum AvailabilityType {
    FullTime = "full-time",
    PartTime = "part-time",
    Hours = "hours",
}

@Schema()
export class Availability {
    @Prop({ required: true })
    type: AvailabilityType;

    @Prop({ required: false })
    hours?: number;
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);