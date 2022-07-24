import express from "express";
import { authenticateJsonWebToken } from "../../services/auth.service";
import {
  httpGetAllMentors,
  httpGetMentorProfileByUserId,
  httpUpdateMentorProfile,
} from "./mentors.controller";

const router = express.Router();

router.get("/", authenticateJsonWebToken, httpGetAllMentors);

router.get("/profile", authenticateJsonWebToken, httpGetMentorProfileByUserId);

router.post("/", authenticateJsonWebToken, httpUpdateMentorProfile);

export default router;
