import { Hardskill } from "src/common/dtos/hardSkill.dto";
import { Softkill } from "src/common/dtos/softSkill.dto";

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