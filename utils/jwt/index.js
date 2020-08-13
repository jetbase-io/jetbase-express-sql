import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES } from '../../configs/constants';

export const jwtSign = payload => jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
