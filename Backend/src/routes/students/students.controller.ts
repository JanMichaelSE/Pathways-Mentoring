import { Request, Response } from "express";

import { findMentorByEmail } from "../../models/mentors.model";
import {
  findAllStudents,
  findStudentByUserId,
  findStudentsByMentor,
  updateStudent,
} from "../../models/students.model";
import { updateUserEmail, updateUserPassword } from "../../models/users.model";

import { IUser, IStudent } from "./../../types/index.d";
import {
  formatPhoneNumber,
  handleBadRequestResponse,
  handleErrorResponse,
  handleNotFoundResponse,
  isValidUUID,
  titleCase,
} from "../../utils/helpers";

async function httpGetAllStudents(req: Request, res: Response) {
  try {
    const students = await findAllStudents();
    return res.status(200).json(students);
  } catch (error) {
    return handleErrorResponse("get all students", error, res);
  }
}

async function httpGetAllStudentsByMentor(req: Request, res: Response) {
  try {
    const requestEmail = req.params.email;
    const mentor = await findMentorByEmail(requestEmail);

    if (!mentor) {
      return handleNotFoundResponse(
        "A mentor with this email doesn't exist.",
        res
      );
    }

    const students = await findStudentsByMentor(mentor.id);
    return res.status(200).json(students);
  } catch (error) {
    return handleErrorResponse("get students by mentor", error, res);
  }
}

async function httpGetStudentByUserId(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const isValidId = isValidUUID(userId);

    if (!isValidId) {
      return handleBadRequestResponse(
        "This Id passed in the URL parameter is not does not have a valid format.",
        res
      );
    }

    const studentResponse = await findStudentByUserId(userId);
    if (!studentResponse) {
      return handleBadRequestResponse(
        "This student does not exist in the system.",
        res
      );
    }

    return res.status(200).json(studentResponse);
  } catch (error) {
    return handleErrorResponse("get student by user id", error, res);
  }
}

async function httpUpdateStudentProfile(req: Request, res: Response) {
  try {
    const userInfo: IUser = {
      id: req.body.userId,
      email: req.body.email,
      password: req.body.currentPassword,
      newPassword: req.body.newPassword,
    };
    const studentInfo: IStudent = {
      name: titleCase(req.body.name),
      phone: formatPhoneNumber(req.body.phone),
      gender: titleCase(req.body.gender),
      fieldOfStudy: titleCase(req.body.fieldOfStudy),
      institution: titleCase(req.body.institution),
      gpa: req.body.gpa,
      graduationDate: req.body.graduationDate,
      profilePicture: req.body.profilePicture,
    };

    if (!userInfo.id) {
      return handleBadRequestResponse(
        "To update the student profile, the id of the user is required in the request.",
        res
      );
    }

    const updateEmailResponse = await updateUserEmail(
      userInfo.id,
      userInfo.email
    );
    if ("errorCode" in updateEmailResponse) {
      return res.status(updateEmailResponse.errorCode).json({
        error: updateEmailResponse,
      });
    }

    if (
      userInfo.password &&
      userInfo.newPassword &&
      userInfo.password !== userInfo.newPassword
    ) {
      const updatePasswordResponse = await updateUserPassword(
        userInfo.id,
        userInfo.password,
        userInfo.newPassword
      );

      if ("errorCode" in updatePasswordResponse) {
        return res.status(updatePasswordResponse.errorCode).json({
          error: updatePasswordResponse,
        });
      }
    }

    const updateStudentResponse = await updateStudent(userInfo.id, studentInfo);
    if ("errorCode" in updateStudentResponse) {
      return res.status(updateStudentResponse.errorCode).json({
        error: updateStudentResponse,
      });
    }

    return res.status(200).json(updateStudentResponse);
  } catch (error) {
    return handleErrorResponse("update student profile", error, res);
  }
}

export {
  httpGetAllStudents,
  httpGetAllStudentsByMentor,
  httpGetStudentByUserId,
  httpUpdateStudentProfile,
};
