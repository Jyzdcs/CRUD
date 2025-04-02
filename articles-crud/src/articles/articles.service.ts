import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArticleService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return (await this.databaseService.query('SELECT * FROM articles', []))
      .rows;
  }
}
