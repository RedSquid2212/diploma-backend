import { IsNumber, Min } from 'class-validator';

export class UpdateGameProgressDto {
  @IsNumber()
  @Min(0)
  gameXp: number;
}