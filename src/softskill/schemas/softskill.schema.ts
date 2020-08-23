import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Softskill extends Document {
    @Prop({ required: true })
    name: String;
}

export const SoftskillSchema = SchemaFactory.createForClass(Softskill);