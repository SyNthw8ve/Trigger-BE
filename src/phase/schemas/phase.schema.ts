import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Participation } from 'src/participation/schemas/participation.schema';


@Schema()
export class Phase extends Document {
    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop([{ type: SchemaTypes.ObjectId, ref: 'Participation' }])
    participations: Participation['_id'][];
}

export const PhaseSchema = SchemaFactory.createForClass(Phase);