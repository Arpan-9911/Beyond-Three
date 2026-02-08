// Index File
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import { createInitialAdmin } from "./createAdmin.js";
import adminAuth from "./routes/adminAuth.js";
import heroCarousel from "./routes/heroCarousel.js";
import news from "./routes/news.js";
import event from "./routes/event.js";
import projects from "./routes/projects.js";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://192.168.31.128:5173",
  ],
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use("/api/admin/auth", adminAuth);
app.use("/api/hero-carousel", heroCarousel);
app.use("/api/news", news);
app.use("/api/events", event);
app.use("/api/projects", projects);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    createInitialAdmin();
  })
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));