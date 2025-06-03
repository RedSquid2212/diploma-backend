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
import { UpdateThemeProgressDto } from './dto/updateThemeProgress.dto';
import { UpdateGameProgressDto } from './dto/updateGameXp.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('progress')
export class CoursesController {
    constructor(
        private readonly coursesService: CoursesService,
    ) { }

    @ApiOperation({ summary: 'Get all user courses' })
    @ApiResponse({ status: 200, description: 'Return all user courses' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth('JWT-auth')
    @Get(':userId')
    @UseGuards(JwtAuthGuard)
    getUserCourses(@Param('userId') userId: string) {
        return this.coursesService.getUserCourses(userId);
    }

    @ApiOperation({ summary: 'Update theme progress' })
    @ApiResponse({ status: 200, description: 'Update user theme progress' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth('JWT-auth')
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

    @ApiOperation({ summary: 'Update game record' })
    @ApiResponse({ status: 200, description: 'Update user game record' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth('JWT-auth')
    @Put(':userId/game')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
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