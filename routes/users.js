import express from 'express';
import { protect } from '../middlewares/protected';
import { authorize } from '../middlewares/authorize';
import { getRegisteredUsers } from '../controllers/users';
const router = express.Router();

router.get('/', protect, authorize('admin'), getRegisteredUsers);

export default router;
