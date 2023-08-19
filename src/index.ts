import express, { Express } from 'express';
import { router_test } from './endpoints';
import { getEnv } from './getenv';
import {AppDataSource} from "./data-source";
import cors from 'cors';

AppDataSource.initialize().then(() => {
  console.log('Data source has been initialized!')
});

const app: Express = express();
const port = getEnv('PORT', 3000);

app.use(cors());
app.use(express.json({limit: '5mb'}));
app.set('trust proxy', true);

app.use(router_test);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
