import express from 'express';
import { login } from '../controllers/auth';
import { loginPayload, checkLoginValid } from '../middlewares/validators/auth';

const router = express.Router();

router.post('/', loginPayload, checkLoginValid, login);

export default router;
