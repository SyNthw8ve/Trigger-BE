import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Position {
    @Prop({ required: true })
    longitude: number;

    @Prop({ required: true })
    latitude: number;
}

const PositionSchema = SchemaFactory.createForClass(Position);

@Schema()
export class Locale {
    @Prop({ required: true })
    address: string;

    @Prop({ type: PositionSchema, required: true })
    position: Position;
}

export const LocaleSchema = SchemaFactory.createForClass(Locale);