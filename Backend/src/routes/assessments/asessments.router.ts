import express from "express";
import {
  httpAddAssessment,
  httpAnswerAssessment,
  httpDeleteAssessment,
  httpGetAllAssessments,
  httpGetAssessment,
  httpUpdateAssessment,
} from "./assessments.controller";

const router = express.Router();

router.get("/", httpGetAllAssessments);

router.get("/:id", httpGetAssessment);

router.post("/", httpAddAssessment);

router.post("/answer/:assessmentId", httpAnswerAssessment);

router.post("/:id", httpUpdateAssessment);

router.delete("/:id", httpDeleteAssessment);

export default router;
