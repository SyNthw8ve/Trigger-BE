import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { Opening } from 'src/opening/schemas/opening.schema';
import { Phase } from 'src/phase/schemas/phase.schema';
import { Task } from "src/common/dtos/task";

@Schema()
export class Participation extends Document {
    @Prop({ type: SchemaTypes.ObjectId, ref: Opening.name, required: true })
    opening: Opening['_id'];

    @Prop({ type: SchemaTypes.ObjectId, ref: Phase.name, required: true })
    phase: Phase['_id'];

    @Prop([Task])
    tasks: Task[];
}

export const ParticipationSchema = SchemaFactory.createForClass(Participation);