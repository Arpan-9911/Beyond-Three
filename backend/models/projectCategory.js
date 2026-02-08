import mongoose from "mongoose";

const projectCategorySchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProjectCategory", projectCategorySchema);