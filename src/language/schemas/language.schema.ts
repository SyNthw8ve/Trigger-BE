import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Language extends Document {
    @Prop({ required: true })
    name: String;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);