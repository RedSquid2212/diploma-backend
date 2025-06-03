import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdateGameProgressDto {
  @ApiProperty({
    example: 10,
    description: 'Value of received gameXp',
    required: true,
  })
  @IsNumber()
  @Min(0)
  gameXp: number;
}