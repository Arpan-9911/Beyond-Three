import express from "express";
import {
  getAbout,
  updateFounder,
  updateMethodology,
  updateWhoWeAre,
  updateMissionVision,
  addDocument,
  deleteDocument,
  addFaq,
  updateFaq,
  deleteFaq,
} from "../controllers/about.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getAbout);
router.post(
  "/founder",
  protect,
  upload.single("image"),
  updateFounder
);
router.post(
  "/methodology",
  protect,
  upload.single("image"),
  updateMethodology
);
router.post(
  "/who-we-are",
  protect,
  upload.single("image"),
  updateWhoWeAre
);
router.post(
  "/mission-vision",
  protect,
  updateMissionVision
);
router.post(
  "/documents",
  protect,
  upload.single("document"),
  addDocument
);
router.delete(
  "/documents/:index",
  protect,
  deleteDocument
);
router.post(
  "/faqs",
  protect,
  addFaq
);
router.put(
  "/faqs/:index",
  protect,
  updateFaq
);
router.delete(
  "/faqs/:index",
  protect,
  deleteFaq
);

export default router;
