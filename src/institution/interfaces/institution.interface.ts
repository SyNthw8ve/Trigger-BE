import { User } from "src/users/interfaces/user.interface";

export interface Institution {
    name: String;
    // photo
    description: String;
    sector: String[];
    // location
    favorites: (User | Institution)[];
    // recommendations [of it's projects]
    // recommended by
}