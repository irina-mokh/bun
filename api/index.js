import express from 'express';
import { sequelize } from '../db/index.js';

import cors from 'cors';
import { router } from '../router/index.js';
import { errorHandler } from '../middleware/errorHandlingMiddleware.js';

// const PORT = process.env.PORT || 5002;
export const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(errorHandler);

app.get('/',(req, res)=>{
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.status(200).json( { message: 'Working!'});
})

app.use('/', router);
