import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { createSHA256 } from 'src/utils/hash';
import { LoginUserDto } from '../users/dto/user.login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findOne(loginUserDto.username);
    const token = this.jwtService.sign( { username: user?.username });
    return {
      username: user?.username,
      accessToken: token,
    };
  }

  public async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    const hashedPassword = createSHA256(password, process.env.SALT ?? 'salt');
    if (user && hashedPassword === user.password) {
      return user;
    }
    throw new BadRequestException('Username or password are incorrect');
  }
}