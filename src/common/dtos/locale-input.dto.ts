import { Position } from "src/common/schemas/locale.schema";
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PositionInput {

    @Field(type => Float, { nullable: false })
    longitude: number;

    @Field(type => Float, { nullable: false })
    latitude: number;
}

@InputType()
export class LocaleInput {

    @Field(type => String, { nullable: false })
    address: string;

    @Field(type => PositionInput, { nullable: false })
    position: Position;
}