import { User } from "src/users/dtos/user.dto";

export interface Project {
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