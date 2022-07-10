import express from "express";
import {
  httpAddAssessment,
  httpAnswerAssessment,
  httpDeleteAssessment,
  httpGetAllAssessments,
  httpGetAnswersByAssessement,
  httpGetAssessment,
  httpUpdateAssessment,
} from "./assessments.controller";

const router = express.Router();

router.get("/", httpGetAllAssessments);

router.get("/:assessmentId", httpGetAssessment);

router.get("/answer/:assessmentId", httpGetAnswersByAssessement);

router.post("/", httpAddAssessment);

router.post("/answer/:assessmentId", httpAnswerAssessment);

router.post("/:assessmentId", httpUpdateAssessment);

router.delete("/:assessmentId", httpDeleteAssessment);

export default router;
