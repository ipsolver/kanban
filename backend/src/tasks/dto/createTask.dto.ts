import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  @MaxLength(250)
  description: string;

  @IsString()
  boardId: string;
}