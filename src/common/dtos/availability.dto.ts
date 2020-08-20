export enum AvailabilityType {
    FullTime = "full-time",
    PartTime = "part-time",
    Hours = "hours",
}

export class Availability {
    type: AvailabilityType;
    hours?: number;
}