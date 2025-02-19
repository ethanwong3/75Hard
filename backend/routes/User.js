import express from "express";

import verifyToken from "../middleware/auth.js";
import {
  userFetch,
  userRegister,
  userLogin,
  userUpdate,
} from "../controllers/User.js";

const userRouter = express.Router();

router.get(":id", verifyToken, userFetch);
router.post("/register", userRegister);
router.post("/login", userLogin);
router.patch(":id", verifyToken, userUpdate);

export default userRouter;
