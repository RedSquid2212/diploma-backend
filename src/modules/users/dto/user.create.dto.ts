import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user123',
    description: 'Unique username',
    required: true
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
    required: true,
    minLength: 6
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}