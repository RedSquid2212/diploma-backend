import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  xp: number;

  @Prop({ required: true })
  xpUpdatedAt: string;

  @Prop({ required: true })
  gameXp: number;

  @Prop({ required: true })
  gameXpUpdatedAt: string;

  @Prop({ required: true })
  achievements: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);