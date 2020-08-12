import express from 'express';
import { protect } from '../middlewares/protected';
import { authorize } from '../middlewares/authorize';
import { getRegisteredUsers, createUser } from '../controllers/users';
import { createUserPayload, checkUsersValid } from '../middlewares/validators/users';
const router = express.Router();

router.get('/', protect, authorize('admin'), getRegisteredUsers);
router.post('/', protect, authorize('admin'), createUserPayload, checkUsersValid, createUser);

export default router;
