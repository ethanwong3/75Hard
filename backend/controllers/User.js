import User from "../models/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT;

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
    const hashed = await bcrypt.hash(password, salt);

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
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
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
    // retrieve email and pw from request then check if email is in use
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: "User not found!" });
    }

    // compare pw from request with user's hashed pw
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
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
    console.error(e);
    res.status(500).json({ success: false, error: e.message });
  }
};

// update user
export const userUpdate = async (req, res) => {
  try {
    // use parsed id and new data to update the user found in db
    // new => return updated doc
    // runValidators => apply schema validators
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(400).json({ success: false, error: "User not found!" });
    }
    // Return the updated user data (excluding the password)
    const { password, ...userWithoutPassword } = updatedUser.toObject();
    res.status(200).json({ success: true, data: userWithoutPassword });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: e.message });
  }
};
