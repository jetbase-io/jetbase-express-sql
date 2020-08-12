import Sequelize from 'sequelize';
import { DB_NAME_DEV, DB_USER_DEV, DB_PASSWORD_DEV } from '../constants';

export const sequelize = new Sequelize(DB_NAME_DEV, DB_USER_DEV, DB_PASSWORD_DEV, {
  dialect: 'postgres',
  logging: false,
});
