import { IsEnum, IsInt, IsString, Min, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { ColumnType } from 'generated/prisma/enums';


class ChangeOrderDto {
  @IsString()
  id: string;

  @IsInt()
  @Min(0)
  position: number;

  @IsEnum(ColumnType)
  type: ColumnType;
}

export class ReorderTasksDto {
    @ValidateNested({each: true})
    @Type(() => ChangeOrderDto)
    tasks: ChangeOrderDto[];
}