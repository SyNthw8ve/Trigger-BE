import { Hardskill } from "src/common/schemas/hardskill.schema";

import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Institution } from "src/institution/schemas/institution.schema";
import { Project } from "src/project/schemas/project.schema";
import { Softskill } from "src/common/schemas/softskill.schema";
import { Language } from "src/common/schemas/language.schema";

// Maybe this should be called UserSoftskillResult?
@Schema()
export class UserSoftskill {
    @Prop({ type: SchemaTypes.ObjectId, ref: Softskill.name, required: true })
    softskillId: Softskill['_id'];

    @Prop({ required: true })
    score: number;

    @Prop({ required: true })
    visible: boolean;
}

const ssSchema = SchemaFactory.createForClass(UserSoftskill);

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

    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Project' }])
    projects: Project['_id'][];

    @Prop([{ type: SchemaTypes.ObjectId, ref: Hardskill.name }])
    hardSkills: Hardskill['_id'][];

    @Prop([{ type: ssSchema }])
    softSkills: UserSoftskill[];

    @Prop([{ type: SchemaTypes.ObjectId, ref: Language.name }])
    languages: Language['_id'][];

    // friends: User[]; // not yet
    // favorites: (User | number)[];
    // location
    // recommendations
    // disponiblidade
}


export const UserSchema = SchemaFactory.createForClass(User);