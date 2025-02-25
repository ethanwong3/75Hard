import User from "../models/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT;

// get user
export const userFetch = async (req, res) => {
  try {
    // retrieve user id from route
    const { id } = req.params;
    console.log(`[DEBUG] Fetching user with ID: ${id}`);

    // verify user with id exists and replace challenge ref in user to actual doc data
    const user = await User.findById(id).populate("challenge");
    if (!user) {
      console.error(`[ERROR] User not found: ${id}`);
      return res.status(404).json({ success: false, error: "User not found!" });
    }

    // return user without pw
    const { password, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ success: true, data: userWithoutPassword });
  } catch (e) {
    console.error(`[ERROR] Failed to fetch user: ${e.message}`);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};

// user register
export const userRegister = async (req, res) => {
  try {
    console.log(`[DEBUG] User registration attempt:`, req.body);

    // retrieve user info from route
    const {
      email,
      password,
      firstName,
      lastName,
      age,
      gender,
      height,
      weight,
      activityLevel,
    } = req.body;

    // verify email is unique to db
    const userFound = await User.findOne({ email });
    if (userFound) {
      console.warn(`[WARN] Email already in use: ${email}`);
      return res
        .status(400)
        .json({ success: false, error: "Email already in use" });
    }

    // encrypt pw
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // create user with details and hashed pw
    const user = new User({
      email,
      password: hashed,
      firstName,
      lastName,
      age,
      gender,
      height,
      weight,
      activityLevel,
      challenge: null,
    });

    // add user to db
    await user.save();

    // generate token for authentication
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // create and return new user object without pw to return
    const { password: p, ...userDetails } = user.toObject();
    res.status(201).json({ success: true, data: userDetails, token });
  } catch (e) {
    console.error(`[ERROR] Failed user registration: ${e.message}`);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};

// user login
export const userLogin = async (req, res) => {
  try {
    // retrieve email and pw from request
    const { email, password } = req.body;
    console.log(`[DEBUG] User login attempt: ${email}`);

    // verify user with email exists
    const user = await User.findOne({ email });
    if (!user) {
      console.warn(`[WARN] User not found: ${email}`);
      return res.status(400).json({ success: false, error: "User not found!" });
    }

    // compare pw from request with user's hashed pw
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      console.warn(`[WARN] Incorrect password for: ${email}`);
      return res
        .status(400)
        .json({ success: false, error: "Incorrect password!" });
    }

    // generate a JWT token for authentication
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // return the user data (without password) and the token
    const { password: pwd, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ success: true, data: userWithoutPassword, token });
  } catch (e) {
    console.error(`[ERROR] Failed user login: ${e.message}`);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};

// update user
export const userUpdate = async (req, res) => {
  try {
    // use parsed id and new data
    const { id } = req.params;
    const updateData = req.body;
    console.log(`[DEBUG] User update request: ${id}`, updateData);

    // verify user exists
    const user = await User.findById(id);
    if (!user) {
      console.error(`[ERROR] User not found for update: ${id}`);
      return res.status(400).json({ success: false, error: "User not found!" });
    }

    // if user switches challenge, fetch new goals and reset overall progress
    if (
      updateData.challenge &&
      updateData.challenge !== user.challenge?.toString()
    ) {
      console.log(
        `[DEBUG] User is switching challenges: ${user.challenge} → ${updateData.challenge}`
      );

      // verify challenge switched to exists
      const newChallenge = await Challenge.findById(updateData.challenge);
      if (!newChallenge) {
        console.error(
          `[ERROR] Invalid challenge selected: ${updateData.challenge}`
        );
        return res
          .status(400)
          .json({ success: false, error: "Invalid challenge selected!" });
      }

      // determine shared goals between current and new challenge
      const currentGoals = user.challenge
        ? user.challenge.goals.map((g) => g.name)
        : [];
      const newGoals = newChallenge.goals.map((g) => g.name);
      const sharedGoals = currentGoals.filter((goal) =>
        newGoals.includes(goal)
      );

      // retain shared progress, reset everything else
      const newProgress = {};
      for (const goal of sharedGoals) {
        newProgress[goal] = user.otherProgress[goal] || 0;
      }

      // reset daily streak
      updateData.overallProgress = 0;
      updateData.otherProgress = newProgress;
    }

    // update user in db, new (return updated doc), runValidators (apply schema restrictions)
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("challenge");

    // check if user update succeeded
    if (!updatedUser) {
      console.error(`[ERROR] Failed to update user: ${id}`);
      return res
        .status(500)
        .json({ success: false, error: "Failed to update user" });
    }

    console.log(`[DEBUG] User successfully updated: ${id}`);

    // return user without pw
    const { password, ...userWithoutPassword } = updatedUser.toObject();
    res.status(200).json({ success: true, data: userWithoutPassword });
  } catch (e) {
    console.error(`[ERROR] Failed user update: ${e.message}`);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};
