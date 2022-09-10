import express from "express";
import { authenticateJsonWebToken } from "../../services/auth.service";
import {
  httpGetAllStudents,
  httpGetStudentProfileByUserId,
  httpRequestMentorship,
  httpUpdateStudentProfile,
} from "./students.controller";

const router = express.Router();

router.get("/", authenticateJsonWebToken, httpGetAllStudents);

router.get("/profile", authenticateJsonWebToken, httpGetStudentProfileByUserId);

router.post("/", authenticateJsonWebToken, httpUpdateStudentProfile);

router.post("/request-mentorship", authenticateJsonWebToken, httpRequestMentorship);

export default router;
