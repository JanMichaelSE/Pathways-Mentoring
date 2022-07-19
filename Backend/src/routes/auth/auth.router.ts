import express from "express";
import {
  httpLogin,
  httpRefreshToken,
  httpSignupMentor,
  httpSignupStudent,
} from "./auth.controller";

const router = express.Router();

router.post("/token", httpRefreshToken);

router.post("/login", httpLogin);

router.post("/signup/student", httpSignupStudent);

router.post("/signup/mentor", httpSignupMentor);

export default router;
