import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  article_name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
