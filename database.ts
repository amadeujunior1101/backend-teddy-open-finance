import { Pool, QueryResult } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export class Database {
  private static instance: Database
  private pool: Pool

  private constructor() {
    this.pool = new Pool({
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: parseInt(process.env.PGPORT || '5432', 10),
    })
  }

  public static getInstance(): Database {
    if (!this.instance) {
      this.instance = new Database()
    }
    return this.instance
  }

  public async query(text: string, params?: any[]): Promise<QueryResult> {
    const result = await this.pool.query(text, params)
    return result
  }
}
