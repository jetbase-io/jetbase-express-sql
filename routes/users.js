import express from 'express';
import { protect } from '../middlewares/protected';
import { authorize } from '../middlewares/authorize';
import { getRegisteredUsers, createUser, getCurrentUser, getUserById, updateUser } from '../controllers/users';
import { createUserPayload, checkUsersValid, updateUserPayload } from '../middlewares/validators/users';
const router = express.Router();

router.get('/', protect, authorize('admin'), getRegisteredUsers);
router.post('/', protect, authorize('admin'), createUserPayload, checkUsersValid, createUser);
router.get('/current', protect, getCurrentUser);
router.get('/:user_id', protect, getUserById);
router.put('/:user_id', protect, updateUserPayload, checkUsersValid, updateUser);

export default router;
