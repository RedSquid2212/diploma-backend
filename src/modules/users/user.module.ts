import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UsersService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

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
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }