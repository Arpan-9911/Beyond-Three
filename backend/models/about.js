import mongoose from "mongoose";

// Localized string for English & Hindi
const LocalizedStringSchema = new mongoose.Schema({
  en: { type: String, default: "" },
  hi: { type: String, default: "" },
});

const AboutSchema = new mongoose.Schema(
  {
    founder: {
      image: { type: String },
      name: { type: LocalizedStringSchema },
      title: { type: LocalizedStringSchema },
      description: { type: LocalizedStringSchema },
    },
    whoWeAre: {
      description: { type: LocalizedStringSchema },
    },
    methodology: {
      description: { type: LocalizedStringSchema },
    },
    missionVision: {
      mission: { type: LocalizedStringSchema },
      vision: { type: LocalizedStringSchema },
    },
    documents: {
      type: [
        {
          title: { type: LocalizedStringSchema },
          url: { type: String }, // after upload
        },
      ],
      default: [],
    },
    faqs: {
      type: [
        {
          question: { type: LocalizedStringSchema },
          answer: { type: LocalizedStringSchema },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const About = mongoose.model("About", AboutSchema);
export default About;