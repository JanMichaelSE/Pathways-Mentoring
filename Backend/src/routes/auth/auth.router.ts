import express from "express";
import { authenticateJsonWebToken } from "../../services/auth.service";
import {
  httpLogin,
  httpLogout,
  httpRefreshToken,
  httpResetPassword,
  httpForgotPassword,
  httpSignupMentor,
  httpSignupStudent,
  httpSignupAdmin,
  httpUpdateAdmin,
  httpGetAdminProfile,
} from "./auth.controller";

const router = express.Router();

router.get("/admin/profile", authenticateJsonWebToken, httpGetAdminProfile);

router.post("/refreshToken", httpRefreshToken);

router.post("/login", httpLogin);

router.post("/logout", authenticateJsonWebToken, httpLogout);

router.post("/signup/student", httpSignupStudent);

router.post("/signup/mentor", httpSignupMentor);

router.post("/signup/admin", httpSignupAdmin);

router.post("/admin/profile", authenticateJsonWebToken, httpUpdateAdmin);

router.post("/forgotPassword", httpForgotPassword);

router.post("/resetPassword", authenticateJsonWebToken, httpResetPassword);

export default router;
