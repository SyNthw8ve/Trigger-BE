import { Participation } from "../schemas/participation.schema";

export class ParticipationDto {
    opening: Participation['opening'];
    phase: Participation['phase'];
    tasks: Participation['tasks'];
}