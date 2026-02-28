import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' },
    },
    text: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' },
    },
    stars: { type: Number, default: 5 },
    status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending' },
  }, { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);