import { Controller, Get } from '@nestjs/common';
import { UsersService } from './modules/users/user.service';
import { User } from './modules/users/user.schema';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Get('test-db')
  async getHello(): Promise<User> {
    const user = await this.usersService.create();
    console.log(user);
    return user;
  }
}
