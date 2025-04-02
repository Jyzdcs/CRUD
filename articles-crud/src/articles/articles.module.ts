import { Module } from '@nestjs/common';
import { ArticleController } from './articles.controller';
import { ArticleService } from './articles.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleService, DatabaseService],
})
export class ArticleModule {}
