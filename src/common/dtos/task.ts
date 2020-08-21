import { Prop } from "@nestjs/mongoose";

export class Task {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;
}
