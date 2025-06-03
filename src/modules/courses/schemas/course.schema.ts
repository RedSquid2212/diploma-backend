import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'courses', timestamps: true })
export class Course extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true})
  title: 'JS' | 'HTML' | 'CSS';

  @Prop({ required: true})
  progress: number;

  @Prop({ required: true})
  description: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);