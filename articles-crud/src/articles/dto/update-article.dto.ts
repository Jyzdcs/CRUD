import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  owner: string;

  @IsString()
  article_name: string;

  @IsNumber()
  price: number;
}
