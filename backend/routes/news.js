import express from "express";
import { addNews, allNews, deleteNews, updateNews } from "../controllers/news.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", allNews);
router.post("/add", protect, upload.single("image"), addNews);
router.put("/update/:id", protect, upload.single("image"), updateNews);
router.delete("/delete/:id", protect, deleteNews);

export default router;