import express from "express";
import { authenticateJsonWebToken } from "../../services/auth.service";
import {
  httpAcceptMentorshipRequest,
  httpGetAllMentors,
  httpGetAllStudentsByMentor,
  httpGetMentorProfileByUserId,
  httpUpdateMentorProfile,
} from "./mentors.controller";

const router = express.Router();

router.get("/", authenticateJsonWebToken, httpGetAllMentors);

router.get("/profile", authenticateJsonWebToken, httpGetMentorProfileByUserId);

router.get("/students", authenticateJsonWebToken, httpGetAllStudentsByMentor);

router.post("/", authenticateJsonWebToken, httpUpdateMentorProfile);

router.post("/accept-mentorship", authenticateJsonWebToken, httpAcceptMentorshipRequest);

export default router;
