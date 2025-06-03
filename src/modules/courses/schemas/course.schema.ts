import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'courses', timestamps: true })
export class Course extends Document {
  @Prop({ required: true, unique: true, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true})
  title: 'JS' | 'HTML' | 'CSS';

  @Prop({ required: true})
  progress: number;

  @Prop({ required: true})
  description: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);