import express from "express";
import { allBlogs, addBlog, deleteBlog, updateBlog, toggleStatus } from "../controllers/blogs.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", allBlogs);
router.post("/add", protect, upload.single("image"), addBlog);
router.delete("/delete/:id", protect, deleteBlog);
router.put("/update/:id", protect, upload.single("image"), updateBlog);
router.patch("/status/:id", protect, toggleStatus);

export default router;