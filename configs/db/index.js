import Sequelize from 'sequelize';
import { DB_NAME, DB_USER, DB_PASSWORD } from '../constants';

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  logging: false,
});
