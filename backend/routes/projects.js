import express from "express";
import {
  addProjectCategory,
  deleteProjectCategory,
  allProjectCategories,
  allProjects,
  addProject,
  deleteProject,
  updateProject,
} from "../controllers/projects.js";
import {
  submitParticipation,
  getParticipation,
  approveParticipation,
  rejectParticipation,
} from "../controllers/projectParticipation.js";
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

router.post("/participation", submitParticipation);
router.get("/participation", protect, getParticipation);
router.put("/participation/approve/:id", protect, approveParticipation);
router.put("/participation/reject/:id", protect, rejectParticipation);

export default router;
