import express from "express";
import { login, logout, me } from "../controllers/adminAuth.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, me);

export default router;