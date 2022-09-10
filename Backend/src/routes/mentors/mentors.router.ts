import express from "express";
import { authenticateJsonWebToken } from "../../services/auth.service";
import {
  httpAcceptMentorshipRequest,
  httpApproveMentorAccess,
  httpGetAllMentors,
  httpGetAllStudentsByMentor,
  httpGetMentorProfileByUserId,
  httpGetUnApprovedMentors,
  httpUpdateMentorProfile,
} from "./mentors.controller";

const router = express.Router();

router.get("/", authenticateJsonWebToken, httpGetAllMentors);

router.get("/profile", authenticateJsonWebToken, httpGetMentorProfileByUserId);

router.get("/students", authenticateJsonWebToken, httpGetAllStudentsByMentor);

router.get("/unapproved", authenticateJsonWebToken, httpGetUnApprovedMentors);

router.post("/", authenticateJsonWebToken, httpUpdateMentorProfile);

router.post("/accept-mentorship", authenticateJsonWebToken, httpAcceptMentorshipRequest);

router.post("/approve-mentor", authenticateJsonWebToken, httpApproveMentorAccess);

export default router;
