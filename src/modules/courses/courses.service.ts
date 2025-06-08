import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { UpdateThemeProgressDto } from './dto/updateThemeProgress.dto';
import { User } from '../users/user.schema';
import { Theme } from './schemas/theme.schema';
import { Task } from './schemas/task.schema';

@Injectable()
export class CoursesService {
    constructor(
        @InjectModel(Course.name) private courseModel: Model<Course>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Theme.name) private themeModel: Model<Theme>,
        @InjectModel(Task.name) private taskModel: Model<Task>,
    ) { }

    async getUserCourses(userId: string) {
        const courses = await this.courseModel.find({ userId: new Types.ObjectId(userId) }).exec();
        const themes = await Promise.all(
            courses.map(async (course) => {
                const themes = await this.themeModel.find({ courseId: new Types.ObjectId(course.id as string) }).exec();
                return { ...course.toObject(), themes };
            })
        );
        const result = await Promise.all(
            themes.map(async (course) => {
                const themesWithTasks = await Promise.all(
                    course.themes.map(async (theme) => {
                        const tasks = await this.taskModel.find({ themeId: new Types.ObjectId(theme.id as string) }).exec();
                        return { ...theme.toObject(), tasks };
                    })
                );
                return { ...course, themes: themesWithTasks };
            })
        );
        return result;
    }

    async updateThemeProgress(userId: string, updateThemeProgressDto: UpdateThemeProgressDto) {
        const courseId = new Types.ObjectId(updateThemeProgressDto.courseId);
        const themeId = new Types.ObjectId(updateThemeProgressDto.themeId);
        const taskId = new Types.ObjectId(updateThemeProgressDto.taskId);

        const course = await this.courseModel.findOne({
            _id: courseId,
            userId: new Types.ObjectId(userId),
        });

        if (!course) {
            throw new NotFoundException('Курс не найден у данного пользователя');
        }

        const theme = await this.themeModel.findOne({
            _id: themeId,
            courseId,
        });

        if (!theme) {
            throw new NotFoundException('Тема не найдена в данном курсе');
        }

        await this.taskModel.updateOne(
            { _id: taskId },
            { $set: { isSolved: true }},
        );

        const tasksInTheme = (await this.taskModel.find({ themeId })).length;
        const themeProgressIncrement = (1 / tasksInTheme) * 100;
        const newThemeProgress = Math.min(theme.progress + themeProgressIncrement, 100);

        await this.themeModel.updateOne(
            { _id: themeId },
            { $set: { progress: newThemeProgress } },
        );

        const allThemes = await this.themeModel.find({ courseId });

        const newCourseProgress = allThemes.reduce(
            (sum, t) => sum + t.progress, 0
        ) / allThemes.length;

        await this.courseModel.updateOne(
            { _id: courseId },
            { $set: { progress: newCourseProgress } },
        );

        await this.userModel.findByIdAndUpdate(
            userId,
            { $inc: { xp: updateThemeProgressDto.xp } },
            { $set: { gameXpUpdatedAt: new Date().toISOString() } },
        );

        return this.getUserCourses(userId);
    }

    async updateGameRecord(userId: string, newGameXp: number) {
        const user = await this.userModel.findById(new Types.ObjectId(userId));

        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        if (newGameXp > user.gameXp) {
            user.gameXp = newGameXp;
            user.gameXpUpdatedAt = new Date().toISOString();
            await user.save();

            return {
                id: user.id,
                xp: user.xp,
                gameXp: user.gameXp,
                achievements: user.achievements,
                username: user.username,
            };
        }

        return {
            success: false,
            message: 'Текущий рекорд выше полученного',
            currentGameXp: user.gameXp
        };
    }
}