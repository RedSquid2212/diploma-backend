import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/user.schema';
import { Course, CourseSchema } from './schemas/course.schema';
import { Theme, ThemeSchema } from './schemas/theme.schema';
import { Task, TaskSchema } from './schemas/task.schema';

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
    controllers: [CoursesController],
    providers: [CoursesService],
})
export class CoursesModule { }