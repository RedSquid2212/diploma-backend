import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'themes', timestamps: true })
export class Theme extends Document {
    @Prop({ required: true, ref: 'Course' })
    courseId: Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    progress: number;
}

export const ThemeSchema = SchemaFactory.createForClass(Theme);