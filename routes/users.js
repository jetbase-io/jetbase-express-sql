import express from 'express';
import { protect } from '../middlewares/protected';
import { authorize } from '../middlewares/authorize';
import { getRegisteredUsers, createUser, getCurrentUser, getUserById } from '../controllers/users';
import { createUserPayload, checkUsersValid } from '../middlewares/validators/users';
const router = express.Router();

router.get('/', protect, authorize('admin'), getRegisteredUsers);
router.post('/', protect, authorize('admin'), createUserPayload, checkUsersValid, createUser);
router.get('/current', protect, getCurrentUser);
router.get('/:user_id', protect, authorize('admin', 'user'), getUserById);

export default router;
