require('dotenv').config();

const DB_USER_DEV = process.env.DB_USER_DEV;
const DB_PASSWORD_DEV = process.env.DB_PASSWORD_DEV;
const DB_NAME_DEV = process.env.DB_NAME_DEV;
const DB_HOST_DEV = process.env.DB_HOST_DEV;

const DB_NAME_TEST = process.env.DB_NAME_TEST;
const DB_PASSWORD_TEST = process.env.DB_PASSWORD_TEST;
const DB_USER_TEST = process.env.DB_USER_TEST;
const DB_HOST_TEST = process.env.DB_HOST_TEST;

module.exports = {
  development: {
    username: DB_USER_DEV,
    password: DB_PASSWORD_DEV,
    database: DB_NAME_DEV,
    host: DB_HOST_DEV,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: DB_USER_TEST,
    password: DB_PASSWORD_TEST,
    database: DB_NAME_TEST,
    host: DB_HOST_TEST,
    dialect: 'postgres',
    logging: false,
  },
};
