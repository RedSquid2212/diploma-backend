import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UsersService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { Course, CourseSchema } from '../courses/schemas/course.schema';
import { Theme, ThemeSchema } from '../courses/schemas/theme.schema';
import { Task, TaskSchema } from '../courses/schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Theme.name, schema: ThemeSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }