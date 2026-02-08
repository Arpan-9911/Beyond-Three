import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { 
      en: { type: String, default: '' },
      hi: { type: String, default: '' },
     },
     content: { 
      en: { type: String, default: '' },
      hi: { type: String, default: '' },
     },
     date: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("News", newsSchema);