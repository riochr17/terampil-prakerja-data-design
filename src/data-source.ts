require('dotenv').config();
import { DataSource, DataSourceOptions } from "typeorm";
import { getEnv } from "./getenv";

const config: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRE_HOST,
  port: parseInt(process.env.POSTGRE_PORT ?? '0'),
  username: process.env.POSTGRE_USERNAME,
  password: process.env.POSTGRE_PASSWORD,
  database: process.env.POSTGRE_DATABASE,
  synchronize: false,
  logging: false,
  migrations: [
    __dirname + '/migration/**/*{.ts,.js}'
  ],
  entities: [
    __dirname + '/**/*.entity{.ts,.js}'
  ]
};

export const AppDataSource = new DataSource(config);
