import { User } from "src/user/dtos/user.dto";

export class Institution {
    name: String;
    // photo
    description: String;
    sector: String[];
    // location
    favorites: (User | Institution)[];
    // recommendations [of it's projects]
    // recommended by
}