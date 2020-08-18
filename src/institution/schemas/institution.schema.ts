import { Hardskill } from "src/common/dtos/hardSkill.dto";
import { Softkill } from "src/common/dtos/softSkill.dto";

import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { User } from "src/user/schemas/user.schema";
import { Project } from "src/project/schemas/project.schema";

@Schema()
export class Institution extends Document {
    @Prop({ required: true })
    name: String;
    // photo
    @Prop({ required: true })
    description: String;

    @Prop({ required: true })
    sector: String;

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    manager: User['_id'];

    @Prop([{ type: SchemaTypes.ObjectId, ref: User.name }])
    admins: User['_id'][];

    // @Prop({ required: true })
    // localization: { address: string, position: { longitude: number, latitude: number } }

    @Prop([{ type: SchemaTypes.ObjectId, ref: Project.name }])
    projects: Project['_id'][]
    // favorites: (User | Institution)[];
    // recommendations [of it's projects]
    // recommended by
}


export const InstitutionSchema = SchemaFactory.createForClass(Institution);