import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ArticleService } from './articles.service';
import { Article } from './dto/create-article.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { ArticleIdValidationPipe } from '../common/pipes/article-id-validation.pipe';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @UseInterceptors(LoggingInterceptor)
  async findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async findOne(@Param('id', ArticleIdValidationPipe) id: string) {
    return this.articleService.findOne(id);
  }

  @Post()
  async create(@Body() article: Article) {
    return this.articleService.create(article);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() article: Article) {
    return this.articleService.update(id, article);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.articleService.delete(id);
  }
}
