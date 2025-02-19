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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Email already in use" });
    }

    // encrypt pw
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hasPassword(password, salt);

    // create User with details and hashed pw
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      age,
      gender,
      height,
      weight,
      activityLevel,
      ...,
    });
  } catch (e) {}
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
