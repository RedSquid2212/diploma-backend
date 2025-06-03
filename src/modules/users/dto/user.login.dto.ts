import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'user123',
    description: 'Unique username',
    required: true
  })
  @IsNotEmpty()
  readonly username: string;

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




