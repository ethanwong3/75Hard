const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    nutritionProgress: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbohydrates: { type: Number, default: 0 },
      fats: { type: Number, default: 0 },
    },
    nutritionGoals: {
      calories: { type: Number, default: 2000 },
      protein: { type: Number, default: 150 },
      carbohydrates: { type: Number, default: 250 },
      fats: { type: Number, default: 70 },
    },
    overallProgress: {
      type: Number,
      default: 0,
    },
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
    },
    posts: [
      {
        date: { type: Date, default: Date.now },
        description: { type: String, trim: true },
        rating: { type: Number, required: true },
        image: { type: String },
        success: { type: Boolean, required: true },
        posted: { type: Boolean, default: false },
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// Create and export the model
module.exports = mongoose.model("User", userSchema);
