import express from "express";
import { authenticateJsonWebToken } from "../../services/auth.service";
import {
  httpApproveRecord,
  httpCreateRecords,
  httpGetAllRecords,
  httpGetRecordsByMentor,
  httpGetRecordsByStudent,
  httpRejectRecord,
  httpSubmitRecord,
  httpUpdateRecord,
} from "./records.controller";

const router = express.Router();

router.get("/", authenticateJsonWebToken, httpGetAllRecords);

router.get("/student", authenticateJsonWebToken, httpGetRecordsByStudent);

router.get("/mentor", authenticateJsonWebToken, httpGetRecordsByMentor);

router.post("/", authenticateJsonWebToken, httpCreateRecords);

router.post("/submit", authenticateJsonWebToken, httpSubmitRecord);

router.post("/approve", authenticateJsonWebToken, httpApproveRecord);

router.post("/reject", authenticateJsonWebToken, httpRejectRecord);

router.post("/:id", authenticateJsonWebToken, httpUpdateRecord);

export default router;
