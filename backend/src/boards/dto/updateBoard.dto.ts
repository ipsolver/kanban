import { IsString, MinLength } from 'class-validator';

export class UpdateBoardDto {
  @IsString()
  @MinLength(3)
  name: string;
}
