import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  async onModuleInit() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    await this.pool.connect();
    console.log('Connected to database');
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async query(text: string, params: any[]) {
    return this.pool.query(text, params);
  }
}
