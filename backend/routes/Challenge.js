import express from "express";

import { challengeFetch } from "../controllers/Challenge.js";

const challengeRouter = express.Router();

router.get(":id", challengeFetch);

export default challengeRouter;
