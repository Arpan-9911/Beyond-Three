import mongoose from "mongoose";

const heroCarouselSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    name: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' },
    },
    quote: { 
      en: { type: String, default: '' },
      hi: { type: String, default: '' },
     },
  },
  { timestamps: true }
);

export default mongoose.model("HeroCarousel", heroCarouselSchema);