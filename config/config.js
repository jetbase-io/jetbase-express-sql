require('dotenv').config();

const DB_USER_DEV = process.env.DB_USER_DEV;
const DB_PASSWORD_DEV = process.env.DB_PASSWORD_DEV;
const DB_NAME_DEV = process.env.DB_NAME_DEV;

const DB_NAME_TEST = process.env.DB_NAME_TEST;
const DB_PASSWORD_TEST = process.env.DB_PASSWORD_TEST;
const DB_USER_TEST = process.env.DB_USER_TEST;

module.exports = {
  development: {
    username: DB_USER_DEV,
    password: DB_PASSWORD_DEV,
    database: DB_NAME_DEV,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: DB_USER_TEST,
    password: DB_PASSWORD_TEST,
    database: DB_NAME_TEST,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
};
