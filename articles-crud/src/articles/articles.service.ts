import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Article } from './articles.entity';

@Injectable()
export class ArticleService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return (await this.databaseService.query('SELECT * FROM articles', []))
      .rows;
  }

  async findOne(id: string) {
    return (
      await this.databaseService.query('SELECT * FROM articles WHERE id = $1', [
        id,
      ])
    ).rows[0];
  }

  async create(article: Article) {
    const result = await this.databaseService.query(
      'INSERT INTO articles (owner, article_name, price, posted_at) VALUES ($1, $2, $3, $4) RETURNING id',
      [
        article.owner,
        article.article_name,
        article.price,
        new Date().toLocaleDateString('fr-FR'),
      ],
    );
    return { message: 'Article created successfully' };
  }

  async update(id: string, article: Article) {
    const result = await this.databaseService.query(
      'UPDATE articles SET owner = $1, article_name = $2, price = $3, posted_at = $4 WHERE id = $5',
      [
        article.owner,
        article.article_name,
        article.price,
        new Date().toLocaleDateString('fr-FR'),
        id,
      ],
    );
    return { message: 'Article updated successfully' };
  }

  async delete(id: string) {
    await this.databaseService.query('DELETE FROM articles WHERE id = $1', [
      id,
    ]);
    return { message: 'Article deleted successfully' };
  }
}
