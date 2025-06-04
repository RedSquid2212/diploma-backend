import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { createSHA256 } from 'src/utils/hash';
import { LoginUserDto } from '../users/dto/user.login.dto';
import { Response } from 'express';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  public async login(loginUserDto: LoginUserDto, res: Response) {
    const user = await this.usersService.findOne(loginUserDto.username);

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    const token = this.jwtService.sign({ username: user.username });
    res.cookie('accessToken', token, {
      httpOnly: true,
      maxAge: 24 * 24 * 60 * 60 * 1000,
      secure: false,
      domain: 'localhost',
      sameSite: 'lax',
    });

    return {
      id: user.id,
      xp: user.xp,
      gameXp: user.gameXp,
      achievements: user.achievements,
      username: user.username,
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