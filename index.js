import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PORT } from './configs/constants';
import authRoute from './routes/auth';
import usersRoute from './routes/users';
import { errorHandler } from './middlewares/error-handler';
import db from './models/index';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/login', authRoute);
app.use('/api/v1/users', usersRoute);

app.use(errorHandler);

const runApp = () => console.log(`App run on port ${PORT}`);
export default app;

const init = async () => {
  try {
    await db.sequelize.sync();
    // await initialCreate();
    app.listen(PORT, runApp);
    return app;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

init();
