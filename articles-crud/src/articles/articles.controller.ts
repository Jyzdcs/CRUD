import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArticleService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { ArticleIdValidationPipe } from '../common/pipes/article-id-validation.pipe';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UpdateArticleDto } from './dto/update-article.dto';
import { OwnerGuard } from 'src/common/guards/owner.guard';

@Controller('articles')
@UseFilters(HttpExceptionFilter)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(LoggingInterceptor)
  async findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ArticleIdValidationPipe) id: string) {
    return this.articleService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() article: CreateArticleDto, @User() user: object) {
    return this.articleService.create(article);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() article: UpdateArticleDto) {
    return this.articleService.update(id, article);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, OwnerGuard)
  async delete(@Param('id', ArticleIdValidationPipe) id: string) {
    return this.articleService.delete(id);
  }
}
