import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Hardskill extends Document {
    @Prop({ required: true })
    name: String;
}

export const HardskillSchema = SchemaFactory.createForClass(Hardskill);