import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/User.js";
import challengeRouter from "./routes/Challenge.js";

// load env variables
dotenv.config();

// create app
const app = express();

// Middleware Setup ///////////////////////////////////////////////////////////
// parse json => cors => routes => catch-all route => error-handling
app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/challenge", challengeRouter);
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });
