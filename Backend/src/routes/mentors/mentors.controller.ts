import { Request, Response } from "express";

import {
  findMentorByUserId,
  findAllMentors,
  updateMentor,
  validateMentorExists,
  findUnApprovedMentors,
  findMentorById,
  findMentorByStudentId,
} from "../../models/mentors.model";
import {
  updateUserApproval,
  updateUserEmail,
  updateUserPassword,
  validateProfileUpdate,
} from "../../models/users.model";

import { IUser, IMentor } from "./../../types/index.d";
import {
  formatPhoneNumber,
  handleBadRequestResponse,
  handleErrorResponse,
  handleNotFoundResponse,
  isValidUUID,
  titleCase,
} from "../../utils/helpers";
import {
  findStudentByUserId,
  findStudentsByMentor,
  updateStudentMentorship,
  validateStudentIdExists,
} from "../../models/students.model";
import { createRecords } from "../../models/records.model";
import {
  sendAcceptedMentorshipEmail,
  sendApprovedMentorAccessEmail,
} from "../../services/mail.service";

async function httpGetAllMentors(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const student = await findStudentByUserId(userId);
    if (!student) {
      return handleBadRequestResponse("A student with this Id doesn't exist.", res);
    }

    let mentors = await findAllMentors();
    let studentMentor = await findMentorByStudentId(student.id);
    mentors = mentors.map((m) => {
      if (m.id === studentMentor[0]?.id) {
        return {
          ...m,
          isActiveMentor: true,
        };
      } else {
        return {
          ...m,
          isActiveMentor: false,
        };
      }
    });

    return res.status(200).json(mentors);
  } catch (error) {
    return handleErrorResponse("get all mentors", error, res);
  }
}

async function httpGetMentorProfileByUserId(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const mentorResponse = await findMentorByUserId(userId);
    if (!mentorResponse) {
      return handleBadRequestResponse("This mentor does not exist in the system.", res);
    }

    return res.status(200).json(mentorResponse);
  } catch (error) {
    return handleErrorResponse("get mentor by user id", error, res);
  }
}

async function httpGetAllStudentsByMentor(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const mentor = await findMentorByUserId(userId);
    if (!mentor) {
      return handleNotFoundResponse("A mentor with this ID doesn't exist.", res);
    }

    const students = await findStudentsByMentor(mentor.id);
    return res.status(200).json(students);
  } catch (error) {
    return handleErrorResponse("get students by mentor", error, res);
  }
}

async function httpGetUnApprovedMentors(req: Request, res: Response) {
  try {
    const mentors = await findUnApprovedMentors();
    return res.status(200).json(mentors);
  } catch (error) {
    return handleErrorResponse("get unapproved mentors", error, res);
  }
}

async function httpUpdateMentorProfile(req: Request, res: Response) {
  try {
    const userInfo: IUser = {
      id: req.userId,
      email: req.body.email,
      password: req.body.currentPassword,
      newPassword: req.body.newPassword,
    };
    const mentorInfo: IMentor = {
      name: titleCase(req.body.name),
      phone: formatPhoneNumber(req.body.phone),
      gender: titleCase(req.body.gender),
      department: titleCase(req.body.department),
      academicDegree: titleCase(req.body.academicDegree),
      office: req.body.office,
      officeHours: req.body.officeHours,
      facultyStatus: titleCase(req.body.facultyStatus),
      interests: req.body.interests,
      description: req.body.description,
      profilePicture: req.body.profilePicture,
    };

    const validatedUserResponse = await validateProfileUpdate(userInfo);
    if ("errorCode" in validatedUserResponse) {
      return res.status(validatedUserResponse.errorCode).json({
        error: validatedUserResponse,
      });
    }

    const validatedMentorResponse = await validateMentorExists(validatedUserResponse.id);
    if ("errorCode" in validatedMentorResponse) {
      return res.status(validatedMentorResponse.errorCode).json({
        error: validatedMentorResponse,
      });
    }

    if (userInfo.email) {
      await updateUserEmail(validatedUserResponse, userInfo.email);
    }

    if (userInfo.newPassword) {
      await updateUserPassword(validatedUserResponse, userInfo.newPassword);
    }

    const updateMentorResponse = await updateMentor(
      validatedMentorResponse.id,
      userInfo.email,
      mentorInfo
    );

    return res.status(200).json(updateMentorResponse);
  } catch (error) {
    return handleErrorResponse("update mentor profile", error, res);
  }
}

async function httpAcceptMentorshipRequest(req: Request, res: Response) {
  try {
    const studentId = req.body.studentId;
    const student = await validateStudentIdExists(studentId);
    if ("errorCode" in student) {
      return res.status(student.errorCode).json({
        error: student,
      });
    }

    const mentorUserId = req.userId;
    const mentor = await findMentorByUserId(mentorUserId);
    if (!mentor) {
      return handleNotFoundResponse("A mentor with this ID doesn't exist.", res);
    }

    const updatedStudent = await updateStudentMentorship(student.id, mentor.id, false);
    const records = await createRecords(mentor.id, student.id);
    let mentorFormattedName = mentor.name.replace(";", "");
    await sendAcceptedMentorshipEmail(student.email, mentorFormattedName);

    return res.status(200).json({
      student: updatedStudent,
      records: records,
    });
  } catch (error) {
    return handleErrorResponse("accept mentorship request", error, res);
  }
}

async function httpApproveMentorAccess(req: Request, res: Response) {
  try {
    const mentorId = req.body.mentorId;

    const isValid = await isValidUUID(mentorId);
    if (!isValid) {
      return handleBadRequestResponse(
        "This Id passed in the request does not have a valid format.",
        res
      );
    }

    const mentor = await findMentorById(mentorId);
    if (!mentor) {
      return handleNotFoundResponse("No mentor exists with the provided Id.", res);
    }

    const updatedUser = await updateUserApproval(mentor.userId, true);
    await sendApprovedMentorAccessEmail(mentor.email);

    return res.status(200).json(updatedUser);
  } catch (error) {
    return handleErrorResponse("approve mentor access", error, res);
  }
}

export {
  httpGetAllMentors,
  httpGetMentorProfileByUserId,
  httpGetAllStudentsByMentor,
  httpUpdateMentorProfile,
  httpAcceptMentorshipRequest,
  httpGetUnApprovedMentors,
  httpApproveMentorAccess,
};
