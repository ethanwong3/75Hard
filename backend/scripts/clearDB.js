import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js"; // Adjust path based on location
import Workout from "../models/Workout.js";

dotenv.config(); // Load environment variables

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("Connected to MongoDB. Deleting all data...");

// Delete all collections
await User.deleteMany({});
await Workout.deleteMany({});

console.log("All collections cleared.");

// Close connection
await mongoose.disconnect();
console.log("Disconnected from MongoDB.");
