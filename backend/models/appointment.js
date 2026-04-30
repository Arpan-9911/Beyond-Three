import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    date: {
      type: String,
      required: true,
      default: new Date().toISOString().split("T")[0], // Default to today's date
    },
    time: {
      type: String,
      required: true,
      default: new Date().toISOString().split("T")[1].substring(0, 5), // Default to current time (HH:mm)
    },
    notes: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);