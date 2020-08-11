import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './db';
import { PORT } from './configs/constants';
import { initialCreate } from './utils/db';
import authRoute from './routes/auth';
import usersRoute from './routes/users';
import { errorHandler } from './middlewares/error-handler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/login', authRoute);
app.use('/api/v1/users', usersRoute);

app.use(errorHandler);

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
