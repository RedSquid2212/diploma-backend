import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>
  ) {}

  async getUserCourses(userId: string) {
    return this.courseModel.find({ userId });
  }

  async updateThemeProgress(userId: string, courseId: string, themeId: string, progress: number) {
    return this.courseModel.findOneAndUpdate(
      { _id: courseId, userId },
      { $set: { 'themes.$[elem].progress': progress } },
      { 
        arrayFilters: [{ 'elem._id': themeId }],
        new: true
      }
    );
  }
}