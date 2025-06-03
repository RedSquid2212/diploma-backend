import { Controller, Get, UseGuards } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('leaderboard')
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService) { }

    @ApiOperation({ summary: 'Get courses leaderboard' })
    @ApiResponse({ status: 200, description: 'Return courses leaderboard' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @Get()
    async getMainLeaderboard() {
        return this.leaderboardService.getMainLeaderboard();
    }

    @ApiOperation({ summary: 'Get game leaderboard' })
    @ApiResponse({ status: 200, description: 'Return game leaderboard' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @Get('game')
    async getGameLeaderboard() {
        return this.leaderboardService.getGameLeaderboard();
    }
}