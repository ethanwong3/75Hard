import express from "express";

import {
  userFetch,
  userRegister,
  userLogin,
  userUpdate,
} from "../controllers/User.js";

const userRouter = express.Router();

router.get(":id", userFetch);
router.post("/register", userRegister);
router.post("/login", userLogin);
router.patch(":id", userUpdate);

export default userRouter;
