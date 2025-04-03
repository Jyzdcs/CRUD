import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Article {
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
