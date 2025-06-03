import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/user.schema';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ]),
        JwtModule.register({
            secret: process.env.JWT_SECRET ?? 'secret-key',
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [LeaderboardController],
    providers: [LeaderboardService],
})
export class LeaderboardModule { }