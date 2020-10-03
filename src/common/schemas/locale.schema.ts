import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectType, Field, Float, } from "@nestjs/graphql";

@ObjectType()
@Schema()
export class Position {

    @Field(type => Float, { nullable: false })
    @Prop({ type: Number, required: true })
    longitude: number;

    @Field(type => Float, { nullable: false })
    @Prop({ type: Number, required: true })
    latitude: number;
}

const PositionSchema = SchemaFactory.createForClass(Position);

@ObjectType()
@Schema()
export class Locale {

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    address: string;

    @Field(type => Position, { nullable: false })
    @Prop({ type: PositionSchema, required: true })
    position: Position;
}

export const LocaleSchema = SchemaFactory.createForClass(Locale);