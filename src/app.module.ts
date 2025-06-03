import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoursesModule } from './modules/courses/courses.module';
import { LeaderboardModule } from './modules/leaderboard/leaderboard.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:test@127.0.0.1:27017/into-atoms?authSource=admin'),
    UsersModule,
    AuthModule,
    CoursesModule,
    LeaderboardModule,
  ],
  providers: [AppService],
})
export class AppModule {}
