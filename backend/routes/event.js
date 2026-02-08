import express from "express";
import { addEvent, allEvents, deleteEvent, updateEvent } from "../controllers/event.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", allEvents);
router.post("/add", protect, upload.single("image"), addEvent);
router.put("/update/:id", protect, upload.single("image"), updateEvent);
router.delete("/delete/:id", protect, deleteEvent);

export default router;