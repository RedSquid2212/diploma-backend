import { Controller, Get } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  async getMainLeaderboard() {
    return this.leaderboardService.getMainLeaderboard();
  }

  @Get('game')
  async getGameLeaderboard() {
    return this.leaderboardService.getGameLeaderboard();
  }
}