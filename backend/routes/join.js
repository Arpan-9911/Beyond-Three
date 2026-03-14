import express from "express";
import { createJoinRequest, getAllRequests, approveMember, rejectRequest } from "../controllers/join.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", protect, getAllRequests);
router.post("/", createJoinRequest);
router.put("/approve/:id", protect, approveMember);
router.put("/reject/:id", protect, rejectRequest);

export default router;