import express from "express";

import { verifyToken } from "../middleware/auth.js";
import {
  userFetch,
  userRegister,
  userLogin,
  userUpdate,
} from "../controllers/User.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/:id", verifyToken, userFetch);
userRouter.patch("/:id", verifyToken, userUpdate);

export default userRouter;
