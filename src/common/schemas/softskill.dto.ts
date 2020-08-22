import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Softskill extends Document {
    @Prop({ required: true })
    name: String;
}