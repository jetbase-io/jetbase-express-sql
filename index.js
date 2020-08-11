import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './db';
import { PORT } from './configs/constants';
import { initialCreate } from './utils/db';

dotenv.config();

const app = express();

const runApp = () => console.log(`App run on port ${PORT}`);

const init = async () => {
  try {
    await sequelize.sync({ force: true });
    await initialCreate();
    app.listen(PORT, runApp);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

init();
