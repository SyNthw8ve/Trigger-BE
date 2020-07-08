import { Hardskill } from "src/common/interfaces/hardSkill.interface";
import { Softkill } from "src/common/interfaces/softSkill.interface";

export interface User {
    name: String;
    // photo
    institution?: String;
    interests: String[];
    hardSkills: Hardskill[];
    softSkills: Softkill[];
    // friends: User[]; // not yet
    favorites: (User | number)[];
    // location
    // recommendations
    // disponiblidade
}