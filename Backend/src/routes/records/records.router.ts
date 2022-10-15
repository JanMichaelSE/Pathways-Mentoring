import express from "express";
import { authenticateJsonWebToken } from "../../services/auth.service";
import {
  httpApproveRecord,
  httpCreateRecords,
  httpGetAllRecords,
  httpGetRecordById,
  httpGetRecordsByUser,
  httpRejectRecord,
  httpSubmitRecord,
  httpUpdateRecord,
} from "./records.controller";

const router = express.Router();

router.get("/", authenticateJsonWebToken, httpGetAllRecords);

router.get("/user", authenticateJsonWebToken, httpGetRecordsByUser);

router.get("/:recordId", authenticateJsonWebToken, httpGetRecordById);

router.post("/", authenticateJsonWebToken, httpCreateRecords);

router.post("/submit", authenticateJsonWebToken, httpSubmitRecord);

router.post("/approve", authenticateJsonWebToken, httpApproveRecord);

router.post("/reject", authenticateJsonWebToken, httpRejectRecord);

router.post("/:id", authenticateJsonWebToken, httpUpdateRecord);

export default router;
