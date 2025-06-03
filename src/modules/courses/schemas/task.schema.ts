import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'tasks', timestamps: true })
export class Task extends Document {
    @Prop({ required: true, ref: 'Theme' })
    themeId: Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    type: 'code' | 'test';

    @Prop({ required: true })
    text: string;

    @Prop({ required: true })
    xp: number;

    @Prop()
    placeholderCode?: string;

    @Prop()
    tests?: string[];

    @Prop()
    variants?: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);