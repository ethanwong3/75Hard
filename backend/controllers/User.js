import User from "../models/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// get user
export const userFetch = async (req, res) => {
  try {
    // retrieve user id from route params, then find and verify user in db
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ success: false, error: "User not found!" });

    //
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: e.message });
  }
};

// user register
export const userRegister = async (req, res) => {
  try {
    // retrieve user info from route params and verify email unique to db
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
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res
        .status(400)
        .json({ success: false, error: "Email already in use" });
    }

    // encrypt pw
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hasPassword(password, salt);

    // create User with details and hashed pw
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
    });

    // add user to db
    await user.save();

    // generate token for authentication
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // create new user object without pw to return
    const { password: p, ...userDetails } = user.toObject();
    res.status(201).json({ success: true, data: userDetails, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: e.message });
  }
};

// user login
export const userLogin = async (req, res) => {
  try {
  } catch (e) {}
};

// update user
export const userUpdate = async (req, res) => {
  try {
  } catch (e) {}
};
