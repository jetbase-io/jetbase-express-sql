import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES } from '../../configs/constants';

export const jwtSign = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
};
