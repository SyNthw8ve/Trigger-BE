import { Locale, LocaleSchema } from 'src/common/schemas/locale.schema';
import { Opening } from "../../opening/schemas/opening.schema";

import { Field, ID, Float, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Availability, AvailabilitySchema } from 'src/common/schemas/availability.schema';
import { Document, SchemaTypes } from 'mongoose';
import { Language } from 'src/language/schemas/language.schema';
import { Hardskill } from 'src/hardskill/schemas/hardskill.schema';
import { Softskill } from 'src/softskill/schemas/softskill.schema';

@ObjectType()
@Schema()
export class DraftCreateOpening extends Document {

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: false })
    name?: Opening['name'];

    @Field(type => String, { nullable: true })
    @Prop({ type: String, required: false })
    tasks?: Opening['tasks'];

    @Field(type => Float, { nullable: true })
    @Prop({ type: Number, required: false })
    remuneration?: Opening['remuneration'];

    @Field(type => Locale, { nullable: true })
    @Prop({ type: LocaleSchema, required: false })
    location?: Opening['location'];

    @Field(type => [ID], { nullable: true })
    @Prop([{ type: SchemaTypes.ObjectId, ref: Hardskill.name }])
    hardskills?: Opening['hardskills'];

    @Field(type => [ID], { nullable: true })
    @Prop([{ type: SchemaTypes.ObjectId, ref: Softskill.name }])
    softskills?: Opening['softskills'];

    @Field(type => [ID], { nullable: true })
    @Prop([{ type: SchemaTypes.ObjectId, ref: Language.name }])
    languages?: Opening['languages'];

    @Field(type => Availability , { nullable: true })
    @Prop({ type: AvailabilitySchema, required: false })
    availability?: Opening['availability'];

    @Field(type => GraphQLISODateTime, { nullable: true })
    @Prop({ type: Date, required: false })
    startDate?: Opening['startDate'];

    @Field(type => GraphQLISODateTime, { nullable: true })
    @Prop({ type: Date, required: false })
    endDate?: Opening['endDate'];
}

export const DraftCreateOpeningSchema = SchemaFactory.createForClass(DraftCreateOpening);
