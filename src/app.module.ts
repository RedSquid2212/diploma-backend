import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoursesModule } from './modules/courses/courses.module';
import { LeaderboardModule } from './modules/leaderboard/leaderboard.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI ?? '', {
      tlsCAFile: 'C:\\Users\\Angelina\\.mongodb\\root.crt',
      tls: true,
      replicaSet: 'rs01',
      authSource: 'admin',
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    LeaderboardModule,
  ],
  providers: [AppService],
})
export class AppModule { }
