import { IsEnum, IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { ColumnType } from 'generated/prisma/enums';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  description?: string;

  @IsOptional()
  @IsEnum(ColumnType)
  type?: ColumnType;

  @IsOptional()
  @IsInt()
  @Min(0)
  position?: number;
}