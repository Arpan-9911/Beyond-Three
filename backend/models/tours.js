import mongoose from "mongoose"

const tourSchema = new mongoose.Schema({
  image: String,
  title: {
    en: { type: String, default: "" },
    hi: { type: String, default: "" },
  },
  description: {
    en: { type: String, default: "" },
    hi: { type: String, default: "" },
  },
  highlights: {
    en: { type: String, default: "" },
    hi: { type: String, default: "" },
  },
  location: {
    en: { type: String, default: "" },
    hi: { type: String, default: "" },
  },
  duration: String,
  price: String,
}, { timestamps: true })

const Tour = mongoose.model("Tour", tourSchema)
export default Tour