import mongoose from "mongoose";

const joinRequestSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["volunteer", "member"],
      required: true,
    },

    name: { type: String, required: true },
    age: Number,
    gender: String,
    bloodGroup: String,
    gotra: String,

    fatherName: String,
    motherName: String,

    mobile: { type: String, required: true },
    email: { type: String },

    address: String,
    education: String,
    occupation: String,

    disease: String,
    medications: String,

    reason: String, // volunteer only
    password: String, // member only (hashed)

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("JoinRequest", joinRequestSchema);