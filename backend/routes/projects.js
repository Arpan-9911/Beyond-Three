import express from "express";
import { addProjectCategory, deleteProjectCategory, allProjectCategories, allProjects, addProject, deleteProject, updateProject } from "../controllers/projects.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", allProjects);
router.post("/add", protect, upload.single("image"), addProject);
router.put("/update/:id", protect, upload.single("image"), updateProject);
router.delete("/delete/:id", protect, deleteProject);

router.get("/categories", allProjectCategories);
router.post("/categories/add", protect, addProjectCategory);
router.delete("/categories/delete/:id", protect, deleteProjectCategory);

export default router;