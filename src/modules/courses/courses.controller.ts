import {
    Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateThemeProgressDto } from './dto/updateThemeProgressDto';
import { UpdateGameProgressDto } from './dto/updateGameXp.dto';

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
    @Body() updateProgressDto: UpdateThemeProgressDto
  ) {
    return this.coursesService.updateThemeProgress(
      userId,
      updateProgressDto,
    );
  }

  @Put(':userId/game')
  @HttpCode(200)
  updateGameRecord(
    @Param('userId') userId: string,
    @Body() updateGameRecordDto: UpdateGameProgressDto,
  ) {
    return this.coursesService.updateGameRecord(
      userId,
      updateGameRecordDto.gameXp
    );
  }
}