import express from 'express';
import { protect } from '../middlewares/protected';
import { authorize } from '../middlewares/authorize';
const router = express.Router();

router.get('/', protect, authorize('admin'), (req, res) => {
  res.json({ work: true });
});

export default router;
