import { Response, Request } from "express";

import { findMentorById, findMentorByUserId } from "../../models/mentors.model";
import {
  createRecords,
  findAllRecords,
  findRecordsByMentor,
  findRecordsByStudent,
  updateRecord,
} from "../../models/records.model";
import { findStudentById, findStudentByUserId } from "../../models/students.model";
import { findUserById } from "../../models/users.model";

import {
  sendRecordApprovedEmail,
  sendRecordRejectedEmail,
  sendSubmitRecordEmail,
} from "../../services/mail.service";

import {
  handleBadRequestResponse,
  handleErrorResponse,
  handleNotFoundResponse,
  isValidUUID,
} from "../../utils/helpers";

async function httpGetAllRecords(req: Request, res: Response) {
  try {
    const records = await findAllRecords();
    return res.status(200).json(records);
  } catch (error) {
    return handleErrorResponse("get all records", error, res);
  }
}

async function httpGetRecordsByUser(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const user = await findUserById(userId);

    if (!user) {
      return handleBadRequestResponse("A user with this Id doesn't exist.", res);
    }

    if (user.role === "Student") {
      const student = await findStudentByUserId(userId);
      if (!student) {
        return handleNotFoundResponse("No student with this access token found.", res);
      }

      const records = await findRecordsByStudent(student.id);
      return res.status(200).json(records);
    } else {
      const mentor = await findMentorByUserId(userId);
      if (!mentor) {
        return handleNotFoundResponse("No mentor with this access token found.", res);
      }

      const records = await findRecordsByMentor(mentor.id);

      return res.status(200).json(records);
    }
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

    const records = await findRecordsByStudent(student.id);

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

    const records = await findRecordsByMentor(mentor.id);

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
    const student = await findStudentById(studentUserId);
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

async function httpSubmitRecord(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const recordId = req.body.recordId;
    const mentorId = req.body.mentorId;

    if (!recordId && !mentorId) {
      return handleBadRequestResponse(
        "Record Id and Mentor Id are required to submit record.",
        res
      );
    }

    const mentor = await findMentorById(mentorId);
    if (!mentor) {
      return handleBadRequestResponse("No mentor with this Id exists in the system.", res);
    }

    const student = await findStudentByUserId(userId);
    if (!student) {
      return handleBadRequestResponse("No student with this Id exits in the system", res);
    }

    const record = await updateRecord(recordId, "Pending Approval");
    let studentFormattedName = student.name.replace(";", "");
    await sendSubmitRecordEmail(mentor.email, studentFormattedName, record.id);

    return res.status(200).json(record);
  } catch (error) {
    return handleErrorResponse("submit record", error, res);
  }
}

async function httpApproveRecord(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const recordId = req.body.recordId;
    const studentId = req.body.studentId;

    if (!recordId && !studentId) {
      return handleBadRequestResponse(
        "Record Id and Student Id are required to approve record.",
        res
      );
    }

    const mentor = await findMentorByUserId(userId);
    if (!mentor) {
      return handleBadRequestResponse("No mentor with this Id exists in the system.", res);
    }

    const student = await findStudentById(studentId);
    if (!student) {
      return handleBadRequestResponse("No student with this Id exits in the system", res);
    }

    const record = await updateRecord(recordId, "Approved");
    let mentorFormattedName = mentor.name.replace(";", "");
    await sendRecordApprovedEmail(student.email, mentorFormattedName);

    return res.status(200).json(record);
  } catch (error) {
    return handleErrorResponse("approve record", error, res);
  }
}

async function httpRejectRecord(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const recordId = req.body.recordId;
    const studentId = req.body.studentId;

    if (!recordId && !studentId) {
      return handleBadRequestResponse(
        "Record Id and Student Id are required to approve record.",
        res
      );
    }

    const mentor = await findMentorByUserId(userId);
    if (!mentor) {
      return handleBadRequestResponse("No mentor with this Id exists in the system.", res);
    }

    const student = await findStudentById(studentId);
    if (!student) {
      return handleBadRequestResponse("No student with this Id exits in the system", res);
    }

    const record = await updateRecord(recordId, "New");
    let mentorFormattedName = mentor.name.replace(";", "");
    await sendRecordRejectedEmail(student.email, mentorFormattedName);

    return res.status(200).json(record);
  } catch (error) {
    return handleErrorResponse("reject record", error, res);
  }
}

export {
  httpGetAllRecords,
  httpGetRecordsByUser,
  httpGetRecordsByStudent,
  httpGetRecordsByMentor,
  httpCreateRecords,
  httpUpdateRecord,
  httpSubmitRecord,
  httpApproveRecord,
  httpRejectRecord,
};
