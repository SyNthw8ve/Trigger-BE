import { Opening } from "src/opening/schemas/opening.schema";
import { Phase } from "src/phase/schemas/phase.schema";
import { Project } from "src/project/schemas/project.schema";
import { Task } from "../../common/schemas/task";

export class CreatePhaseDto {
    project: Project['_id'];
    startDate: Phase['startDate'];
    endDate: Phase['endDate'];
    openingsAndTasks: { opening: Opening['_id']; tasks: Task[]; }[];
}
