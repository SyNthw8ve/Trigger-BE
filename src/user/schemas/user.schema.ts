import { Hardskill } from "src/common/dtos/hardSkill.dto";
import { Softkill } from "src/common/dtos/softSkill.dto";

import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Institution } from "src/institution/schemas/institution.schema";

@Schema()
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;
    // photo
    
    @Prop({ required: false })
    institution?: Institution['_id'];

    @Prop([String])
    interests: String[];

    // @Prop()
    // hardSkills: Hardskill[];

    // @Prop()
    // softSkills: Softkill[];
    // friends: User[]; // not yet
    // favorites: (User | number)[];
    // location
    // recommendations
    // disponiblidade
}


export const UserSchema = SchemaFactory.createForClass(User);