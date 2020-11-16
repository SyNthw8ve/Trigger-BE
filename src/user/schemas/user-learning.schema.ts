import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';

import { ObjectType, Field, ID, Float, InputType, registerEnumType, GraphQLISODateTime } from '@nestjs/graphql';
import { Course } from 'src/course/schemas/course.schema';
import { Institution } from 'src/institution/schemas/institution.schema';


export enum Degree {

    BACHELOR,
    MASTER,
    DOCTORATE
}

registerEnumType(Degree, { name: 'Degree' });


@ObjectType()
@Schema()
export class UserLearning {

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, ref: Course.name, required: true })
    courseId: Course['_id'];

    @Field(type => Degree, { nullable: false })
    @Prop({ type: Degree, required: true })
    degree: Degree;

    @Field(type => ID, { nullable: true })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Institution', required: false })
    institution?: Institution['_id'];

    @Field(type => GraphQLISODateTime, { nullable: false })
    @Prop({ type: Date, required: true })
    startDate: Date;

    @Field(type => GraphQLISODateTime, { nullable: false })
    @Prop({ type: Date, required: true })
    finishDate: Date;
}

export const UserLearningSchema = SchemaFactory.createForClass(UserLearning);

@InputType()
export class UserLearningInput {

    @Field(type => ID, { nullable: false })
    courseId: Course['_id'];

    @Field(type => Degree, { nullable: false })
    degree: Degree;

    @Field(type => ID, { nullable: true })
    institution?: Institution['_id'];

    @Field(type => GraphQLISODateTime, { nullable: false })
    startDate: Date;

    @Field(type => GraphQLISODateTime, { nullable: false })
    finishDate: Date;
}
