import { User } from "src/user/dtos/user.dto";

export class Project {
    title: String;
    // photos
    description: String;
    scope: String;
    // location?
    // status <- What is this D:
    // recommendations
    // deadlines
    currentTeam: User[];
    // openings
}