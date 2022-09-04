import express from "express";
import { authenticateJsonWebToken } from "../../services/auth.service";
import {
  httpCreateRecords,
  httpGetAllRecords,
  httpUpdateRecord,
} from "./records.controller";

const router = express.Router();

router.get("/", authenticateJsonWebToken, httpGetAllRecords);

router.post("/", authenticateJsonWebToken, httpCreateRecords);

router.post("/:id", authenticateJsonWebToken, httpUpdateRecord);

export default router;
