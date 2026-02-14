import express from 'express';
import { allMedia, addMedia, deleteMedia } from '../controllers/media.js';
import { protect } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

router.get('/', allMedia);
router.post('/add', protect, upload.single('file'), addMedia);
router.delete('/delete/:id', protect, deleteMedia);

export default router;