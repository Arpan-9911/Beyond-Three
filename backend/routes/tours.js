import express from 'express';
import { allTours, addTour, deleteTour, updateTour } from '../controllers/tours.js';
import { protect } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

router.get('/', allTours);
router.post('/add', protect, upload.single('image'), addTour);
router.delete('/delete/:id', protect, deleteTour);
router.put('/update/:id', protect, upload.single('image'), updateTour);

export default router;