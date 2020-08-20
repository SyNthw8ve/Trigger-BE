import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Opening } from 'src/opening/schemas/opening.schema';


@Schema()
export class Phase extends Document {
    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop([{ type: SchemaTypes.ObjectId, ref: Opening.name }])
    openings: Opening['_id'][];
}

export const PhaseSchema = SchemaFactory.createForClass(Phase);