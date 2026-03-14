import mongoose from "mongoose";

const projectParticipationSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    // Basic Details
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    gotra: { type: String, required: true },
    bloodGroup: { type: String, required: true },

    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },

    mobile: { type: String, required: true },
    email: { type: String, required: true },

    address: { type: String, required: true },

    education: { type: String, required: true },
    occupation: { type: String, required: true },

    approval: { type: Boolean, required: true },
    reason: { type: String, required: true },
    declaration: { type: Boolean, required: true },

    disease: String,
    medications: String,

    // Admin Status
    status: {
      type: String,
      enum: ["new", "approved", "rejected"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "ProjectParticipation",
  projectParticipationSchema
);