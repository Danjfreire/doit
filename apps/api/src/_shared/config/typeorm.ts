import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { Todo } from 'src/_shared/entities/todo.entity';
import { registerAs } from '@nestjs/config';
import { User } from 'src/_shared/entities/user.entity';

config();

const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.POSTGRES_HOST}`,
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  username: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DB}`,
  entities: [Todo, User],
  migrations: ['dist/migrations/*{.ts,.js}'], // need to refer to the "compiled" transactions directory
  migrationsRun: true,
  synchronize: true, // maybe dangerous?
};

export default registerAs('typeorm', () => dbConfig);
export const connectionSource = new DataSource(dbConfig);
