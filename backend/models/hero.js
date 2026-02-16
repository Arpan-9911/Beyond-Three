import mongoose from "mongoose";

// Validator function to limit array length
function arrayLimit(val) {
  return val.length <= 5;
}

const HeroSectionSchema = new mongoose.Schema(
  {
    heading: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    images: {
      type: [String],
      validate: [arrayLimit, "Images array exceeds the limit of 5"],
      default: [],
    },
    quotes: [
      {
        title: {
          en: { type: String, required: true },
          hi: { type: String, required: true },
        },
        desc: {
          en: { type: String, required: true },
          hi: { type: String, required: true },
        },
      },
    ],
  },
  { timestamps: true }
);

const HeroSection = mongoose.model("HeroSection", HeroSectionSchema);
export default HeroSection;