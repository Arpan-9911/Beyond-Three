import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { 
      en: { type: String, default: '' },
      hi: { type: String, default: '' },
     },
     description: { 
      en: { type: String, default: '' },
      hi: { type: String, default: '' },
     },
     date: { type: String, required: true },
     time: { type: String, required: true },
     location: { 
      en: { type: String, default: '' },
      hi: { type: String, default: '' },
     },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);