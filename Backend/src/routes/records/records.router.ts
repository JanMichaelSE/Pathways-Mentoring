import express from "express";
import { authenticateJsonWebToken } from "../../services/auth.service";
import {
  httpCreateRecords,
  httpGetAllRecords,
  httpGetRecordsByMentor,
  httpGetRecordsByStudent,
  httpUpdateRecord,
} from "./records.controller";

const router = express.Router();

router.get("/", authenticateJsonWebToken, httpGetAllRecords);

router.get("/student", authenticateJsonWebToken, httpGetRecordsByStudent);

router.get("/mentor", authenticateJsonWebToken, httpGetRecordsByMentor);

router.post("/", authenticateJsonWebToken, httpCreateRecords);

router.post("/:id", authenticateJsonWebToken, httpUpdateRecord);

export default router;
