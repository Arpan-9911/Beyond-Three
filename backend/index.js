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
import blogs from "./routes/blogs.js";
import tours from "./routes/tours.js";
import media from "./routes/media.js";
import about from "./routes/about.js";
import review from "./routes/review.js";
import join from "./routes/join.js";

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

app.get("/", (req, res) => {
  res.send("Server working");
});

app.use("/api/admin/auth", adminAuth);
app.use("/api/hero", heroCarousel);
app.use("/api/news", news);
app.use("/api/events", event);
app.use("/api/projects", projects);
app.use("/api/blogs", blogs);
app.use("/api/tours", tours);
app.use("/api/media", media);
app.use("/api/about", about);
app.use("/api/reviews", review);
app.use("/api/join", join);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    createInitialAdmin();
  })
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));