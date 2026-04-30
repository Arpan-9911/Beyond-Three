import express from "express";
import { createAppointment, getAppointments, updateAppointmentStatus } from "../controllers/appointment.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", createAppointment);
router.get("/get", protect, getAppointments);
router.put("/update-status/:id", protect, updateAppointmentStatus);

export default router;