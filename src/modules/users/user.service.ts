import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/user.create.dto';
import { JwtService } from '@nestjs/jwt';
import { createSHA256 } from 'src/utils/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) { }

  async findOne(username: string) {
    return await this.userModel.findOne({ username }).exec();
  }

  async create(userDto: CreateUserDto) {
    const { username, password } = userDto;

    const userInDb = await this.userModel.findOne({ username }).exec();
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const salt = process.env.SALT ?? 'salt';
    const hashPassword = createSHA256(password, salt);

    const user = new this.userModel({
      username,
      password: hashPassword,
    });

    const token = this.jwtService.sign({ username: user.username, id: user.id });

    await user.save();
    return { user, token };
  }
}