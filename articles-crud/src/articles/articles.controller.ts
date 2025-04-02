import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './articles.service';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll() {
    return this.articleService.findAll();
  }
}
