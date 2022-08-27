import express from "express";
import { httpSendContactFormEmail } from "./contact-us.controller";

const router = express.Router();

router.post("/", httpSendContactFormEmail);

export default router;
