import {
    Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('progress')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
  ) { }
  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  getUserCourses(@Param('userId') userId: string) {
    return this.coursesService.getUserCourses(userId);
  }

  @Put(':userId')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  updateThemeProgress(
    @Param('userId') userId: string,
    @Body() updateProgressDto: { courseId: string; themeId: string; progress: number }
  ) {
    return this.coursesService.updateThemeProgress(
      userId,
      updateProgressDto.courseId,
      updateProgressDto.themeId,
      updateProgressDto.progress
    );
  }
}