import { Response, Request } from "express";
import { findMentorByUserId } from "../../models/mentors.model";
import {
  createRecords,
  getAllRecords,
  getRecordsByMentor,
  getRecordsByStudent,
  updateRecord,
} from "../../models/records.model";
import { findStudentByUserId } from "../../models/students.model";
import {
  handleBadRequestResponse,
  handleErrorResponse,
  handleNotFoundResponse,
  isValidUUID,
} from "../../utils/helpers";

async function httpGetAllRecords(req: Request, res: Response) {
  try {
    const records = await getAllRecords();
    return res.status(200).json(records);
  } catch (error) {
    return handleErrorResponse("get all records", error, res);
  }
}

async function httpGetRecordsByStudent(req: Request, res: Response) {
  try {
    const studentUserId = req.userId;

    const student = await findStudentByUserId(studentUserId);
    if (!student) {
      return handleNotFoundResponse("No student with this access token found.", res);
    }

    const records = await getRecordsByStudent(student.id);

    return res.status(200).json(records);
  } catch (error) {
    return handleErrorResponse("get all records", error, res);
  }
}

async function httpGetRecordsByMentor(req: Request, res: Response) {
  try {
    const mentorUserId = req.userId;

    const mentor = await findMentorByUserId(mentorUserId);
    if (!mentor) {
      return handleNotFoundResponse("No mentor with this access token found.", res);
    }

    const records = await getRecordsByMentor(mentor.id);

    return res.status(200).json(records);
  } catch (error) {
    return handleErrorResponse("get all records", error, res);
  }
}

async function httpCreateRecords(req: Request, res: Response) {
  try {
    const mentorUserId = req.userId;
    const studentUserId = req.body.studentId;

    if (!mentorUserId || !studentUserId) {
      return handleBadRequestResponse(
        "The request must include the id of the mentor and student for it to create records.",
        res
      );
    }

    const mentor = await findMentorByUserId(mentorUserId);
    const student = await findStudentByUserId(studentUserId);
    if (!mentor || !student) {
      return handleBadRequestResponse("No mentor or student exists with the provided id's.", res);
    }

    const records = await createRecords(mentor.id, student.id);

    return res.status(200).json(records);
  } catch (error) {
    return handleErrorResponse("create records", error, res);
  }
}

async function httpUpdateRecord(req: Request, res: Response) {
  try {
    const recordId = req.params.id;
    const stage = req.body.stage;

    const isValidId = isValidUUID(recordId);
    if (!isValidId) {
      return handleBadRequestResponse(
        "This Id passed in the URL parameter is not does not have a valid format.",
        res
      );
    }

    if (stage != "New" && stage != "Pending Approval" && stage != "Approved") {
      return handleBadRequestResponse(
        "Stage can only be on of the following: 'New', 'Pending Approval' or 'Approved'",
        res
      );
    }

    const record = await updateRecord(recordId, stage);
    res.status(200).json(record);
  } catch (error) {
    return handleErrorResponse("update record", error, res);
  }
}

async function httpDeleteRecord(req: Request, res: Response) {
  try {
  } catch (error) {
    return handleErrorResponse("delete record", error, res);
  }
}

export {
  httpGetAllRecords,
  httpGetRecordsByStudent,
  httpGetRecordsByMentor,
  httpCreateRecords,
  httpUpdateRecord,
};
