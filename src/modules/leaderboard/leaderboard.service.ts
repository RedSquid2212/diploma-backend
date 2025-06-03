import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/user.schema';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async getMainLeaderboard() {
    return this.userModel
      .find()
      .sort({ xp: -1 })
      .limit(25)
      .select('username xp');
  }

  async getGameLeaderboard() {
    return this.userModel
      .find()
      .sort({ gameXp: -1 })
      .limit(25)
      .select('username gameXp');
  }
}