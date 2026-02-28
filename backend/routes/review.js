import express from "express";
import { getReviews, addReview, approveReview, rejectReview } from "../controllers/review.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/add", addReview);
router.put("/approve/:id", protect, approveReview);
router.put("/reject/:id", protect, rejectReview);

export default router;