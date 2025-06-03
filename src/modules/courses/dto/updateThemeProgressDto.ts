import { IsMongoId, IsNumber, Min } from 'class-validator';

export class UpdateThemeProgressDto {
  @IsMongoId()
  courseId: string;

  @IsMongoId()
  themeId: string;

  @IsNumber()
  @Min(0)
  xp: number;
}