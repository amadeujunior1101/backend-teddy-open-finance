import 'dotenv/config'
import { DataSource } from 'typeorm'
import { ShortenerModel, UserModel } from '../orm/typeorm/models'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [UserModel, ShortenerModel],
  migrations: ['./migrations/*.{ts,js}'],
  subscribers: [],
})
