import {
  Controller,
  Body,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/user.login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/user.create.dto';
import { UsersService } from '../users/user.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 200, description: 'Creates new user' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('register')
  @UsePipes(new ValidationPipe())
  public async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.create(createUserDto, res);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login user in system' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe())
  public async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginUserDto, res);
  }
}