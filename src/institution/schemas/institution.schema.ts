import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { User } from "src/user/schemas/user.schema";
import { Project } from "src/project/schemas/project.schema";
import { Locale } from "src/common/dtos/locale.dto";

@Schema()
export class Institution extends Document {
    @Prop({ required: true })
    name: String;
    // photo
    @Prop({ required: true })
    description: String;

    @Prop({ required: true })
    sector: String;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    creator: User['_id'];

    // TODO: PUT THIS BACK IN
    // @Prop({ required: true })
    location: Locale;

    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Project' }])
    projects: Project['_id'][];
    // favorites: (User | Institution)[];
    // recommendations [of it's projects]
    // recommended by
}


export const InstitutionSchema = SchemaFactory.createForClass(Institution);