import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/user.create.dto';
import { JwtService } from '@nestjs/jwt';
import { createSHA256 } from 'src/utils/hash';
import { Course } from '../courses/schemas/course.schema';
import { coursesData } from 'src/coursesData/coursesData';
import { themesMap } from 'src/coursesData/themesData';
import { Theme } from '../courses/schemas/theme.schema';
import { Task } from '../courses/schemas/task.schema';
import { taskMap } from 'src/coursesData/tasksData';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Course.name)
    private readonly courseModel: Model<Course>,
    @InjectModel(Theme.name)
    private readonly themeModel: Model<Theme>,
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
    private readonly jwtService: JwtService,
  ) { }

  public async findOne(username: string) {
    return await this.userModel.findOne({ username }).exec();
  }

  public async create(userDto: CreateUserDto, res: Response) {
    const { username, password } = userDto;

    const userInDb = await this.userModel.findOne({ username }).exec();
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const salt = process.env.SALT ?? 'salt';
    const hashPassword = createSHA256(password, salt);

    const user = new this.userModel({
      username,
      password: hashPassword,
      xp: 0,
      xpUpdatedAt: new Date().toISOString(),
      gameXp: 0,
      level: 1,
      gameXpUpdatedAt: new Date().toISOString(),
      achievements: [],
    });

    const token = this.jwtService.sign({ username: user.username, id: user.id });

    await user.save();

    for (const courseData of coursesData) {
      const course = new this.courseModel({
        userId: user._id,
        ...courseData,
      });
      await course.save();

      const themesData = themesMap[course.title];
      for (const themeData of themesData) {
        const theme = new this.themeModel({
          courseId: course._id,
          ...themeData,
        });
        await theme.save();

        const tasksData = taskMap[theme.title];
        for (const taskData of tasksData) {
          const task = new this.taskModel({
            themeId: theme._id,
            ...taskData,
          });
          await task.save();
        }
      }
    }

    res.cookie('accessToken', token, {
      httpOnly: true,
      maxAge: 24 * 24 * 60 * 60 * 1000,
      secure: false,
      domain: 'localhost',
      sameSite: 'lax',
    });

    return {
      id: user.id,
      xp: user.xp,
      gameXp: user.gameXp,
      achievements: user.achievements,
      username: user.username,
    };
  }
}