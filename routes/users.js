import express from 'express';
import { protect } from '../middlewares/protected';
import { authorize } from '../middlewares/authorize';
import {
  getRegisteredUsers,
  createUser,
  getCurrentUser,
  getUserById,
  updateUser,
  deleteUser,
  updateUserPassword,
} from '../controllers/users';
import {
  createUserPayload,
  checkUsersValid,
  updateUserPayload,
  updatePasswordPayload,
} from '../middlewares/validators/users';
import { getUserByIdMdw } from '../middlewares/getUserById';

const router = express.Router();

router.get('/', protect, authorize('admin'), getRegisteredUsers);
router.post('/', protect, authorize('admin'), createUserPayload, checkUsersValid, createUser);
router.get('/current', protect, getCurrentUser);
router.get('/:user_id', protect, getUserByIdMdw, getUserById);
router.put('/:user_id', protect, updateUserPayload, checkUsersValid, getUserByIdMdw, updateUser);
router.put('/:user_id/password', protect, updatePasswordPayload, checkUsersValid, getUserByIdMdw, updateUserPassword);
router.delete('/:user_id', protect, authorize('admin'), getUserByIdMdw, deleteUser);

export default router;
