import express from "express";
import { authenticateJsonWebToken } from "../../services/auth.service";
import {
  httpAddAssessment,
  httpAnswerAssessment,
  httpDeleteAssessment,
  httpGetAllAssessments,
  httpGetAnswersByAssessment,
  httpGetAssessment,
  httpUpdateAssessment,
} from "./assessments.controller";

const router = express.Router();

router.get("/", authenticateJsonWebToken, httpGetAllAssessments);

router.get("/:assessmentId", authenticateJsonWebToken, httpGetAssessment);

router.get(
  "/answer/:assessmentId",
  authenticateJsonWebToken,
  httpGetAnswersByAssessment
);

router.post("/", authenticateJsonWebToken, httpAddAssessment);

router.post(
  "/answer/:assessmentId",
  authenticateJsonWebToken,
  httpAnswerAssessment
);

router.post("/:assessmentId", authenticateJsonWebToken, httpUpdateAssessment);

router.delete("/:assessmentId", authenticateJsonWebToken, httpDeleteAssessment);

export default router;
