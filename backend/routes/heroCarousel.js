import express from "express";
import {
  getHeroSection,
  saveHeading,
  saveImages,
  saveQuotes,
} from "../controllers/heroCarousel.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getHeroSection);
router.post("/heading", protect, saveHeading);
router.post("/images", protect, upload.array("images", 5), saveImages);
router.post("/quotes", protect, saveQuotes);

export default router;
