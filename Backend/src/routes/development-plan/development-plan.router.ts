import express from "express";
import { authenticateJsonWebToken } from "../../services/auth.service";
import { httpAnswerDevelopmentPlan, httpGetDevelopmentPlan } from "./development-plan.controller";

const router = express.Router();

router.get("/", authenticateJsonWebToken, httpGetDevelopmentPlan);

router.post("/answer", authenticateJsonWebToken, httpAnswerDevelopmentPlan);

export default router;
