import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, Min } from 'class-validator';

export class UpdateThemeProgressDto {
  @ApiProperty({
    example: 'some Mongo ID',
    description: 'Course ID from MongoDB',
    required: true,
  })
  @IsMongoId()
  courseId: string;

  @ApiProperty({
    example: 'some Mongo ID',
    description: 'Theme ID from MongoDB',
    required: true,
  })
  @IsMongoId()
  themeId: string;

  @ApiProperty({
    example: 10,
    description: 'Value of received xp',
    required: true,
  })
  @IsNumber()
  @Min(0)
  xp: number;
}