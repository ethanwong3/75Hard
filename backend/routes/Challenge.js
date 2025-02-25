import express from "express";

import { challengeFetch } from "../controllers/Challenge.js";

const challengeRouter = express.Router();

challengeRouter.get("/:id", challengeFetch);
challengeRouter.get("/", challengeFetchAll);

export default challengeRouter;
