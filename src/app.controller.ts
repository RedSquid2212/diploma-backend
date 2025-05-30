import { Controller, Get } from '@nestjs/common';
import { UsersService } from './modules/users/user.service';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Get('test-db')
  getHello() {
    return 'Hello';
  }
}
