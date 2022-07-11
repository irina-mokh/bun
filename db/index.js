import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
          rejectUnauthorized: false
      }
    },
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
);
