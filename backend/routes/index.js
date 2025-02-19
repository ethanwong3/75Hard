import express from "express";

import {
  userFetch,
  userRegister,
  userLogin,
  userUpdate,
} from "../controllers/User.js";
import { challengeFetch } from "../controllers/Challenge.js";

const router = express.router();

router.get(":id", userFetch);
router.post("/register", userRegister);
router.post("/login", userLogin);
router.patch(":id", userUpdate);
router.get(":id", challengeFetch);

export default router;
