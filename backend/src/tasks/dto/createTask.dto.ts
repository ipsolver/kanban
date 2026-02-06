import { IsEnum, IsInt, isNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { ColumnType } from 'generated/prisma/enums';

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