import express from "express";

import { authenticateJsonWebToken } from "../../services/auth.service";
import { httpGetNote } from "./notes.controller";

const router = express.Router();

router.get("/:noteId", authenticateJsonWebToken, httpGetNote);

export default router;
