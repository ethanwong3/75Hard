import mongoose from "mongoose";
const challengeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    rules: {
      type: String,
      required: true,
      trim: true,
    },
    goals: {
      water: { type: number, default: 0 },
      study: { type: number, default: 0 },
      workout: { type: number, default: 0 },
      photo: { type: number, default: 0 },
    },
    total: {
      type: Number,
      min: 1,
      required: true,
    },
    difficulty: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Challenge", challengeSchema);
