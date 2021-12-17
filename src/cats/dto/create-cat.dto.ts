import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCatDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
