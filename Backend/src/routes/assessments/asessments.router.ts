import express from 'express';
import { httpAddAssessment, httpDeleteAssessment, httpGetAllAssessments, httpGetAssessment, httpUpdateAssessment } from './assessments.controller';

const router = express.Router();

router.get("/", httpGetAllAssessments);

router.get("/:id", httpGetAssessment);

router.post("/", httpAddAssessment);

router.post("/:id", httpUpdateAssessment);

router.delete("/:id", httpDeleteAssessment);


export default router;