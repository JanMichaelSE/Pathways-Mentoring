import express from "express";
import { authenticateJsonWebToken } from "../../services/auth.service";
import {
  httpGetAllStudents,
  httpGetAllStudentsByMentor,
  httpGetStudentProfileByUserId,
  httpUpdateStudentProfile,
} from "./students.controller";

const router = express.Router();

router.get(
  "/mentor/:email",
  authenticateJsonWebToken,
  httpGetAllStudentsByMentor
);

router.get("/", authenticateJsonWebToken, httpGetAllStudents);

router.get("/profile", authenticateJsonWebToken, httpGetStudentProfileByUserId);

router.post("/", authenticateJsonWebToken, httpUpdateStudentProfile);

export default router;
