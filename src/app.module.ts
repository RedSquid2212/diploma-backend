import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:test@127.0.0.1:27017/into-atoms?authSource=admin'),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
