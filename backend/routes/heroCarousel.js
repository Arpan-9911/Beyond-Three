import express from "express";
import { addHeroCarousel, allHeroCarousel, deleteHeroCarousel, updateHeroCarousel } from "../controllers/heroCarousel.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", allHeroCarousel);
router.post("/add", protect, upload.single("image"), addHeroCarousel);
router.put("/update/:id", protect, upload.single("image"), updateHeroCarousel);
router.delete("/delete/:id", protect, deleteHeroCarousel);

export default router;