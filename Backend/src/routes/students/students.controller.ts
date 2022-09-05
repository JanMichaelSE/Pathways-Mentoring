import { Request, Response } from "express";

import { findMentorByEmail } from "../../models/mentors.model";
import {
  findAllStudents,
  findStudentByUserId,
  findStudentsByMentor,
  updateStudent,
  validateStudentExists,
} from "../../models/students.model";
import {
  updateUserEmail,
  updateUserPassword,
  validateProfileUpdate,
} from "../../models/users.model";

import { IUser, IStudent } from "./../../types/index.d";
import {
  formatPhoneNumber,
  handleBadRequestResponse,
  handleErrorResponse,
  handleNotFoundResponse,
  titleCase,
} from "../../utils/helpers";
import { sendRequestMentorshipEmail } from "../../services/mail.service";

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

async function httpGetStudentProfileByUserId(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const student = await findStudentByUserId(userId);
    if (!student) {
      return handleBadRequestResponse(
        "This student does not exist in the system.",
        res
      );
    }

    return res.status(200).json(student);
  } catch (error) {
    return handleErrorResponse("get student by user id", error, res);
  }
}

async function httpUpdateStudentProfile(req: Request, res: Response) {
  try {
    const userInfo: IUser = {
      id: req.userId,
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

    const validatedUser = await validateProfileUpdate(userInfo);
    if ("errorCode" in validatedUser) {
      return res.status(validatedUser.errorCode).json({
        error: validatedUser,
      });
    }

    const validatedStudent = await validateStudentExists(validatedUser.id);
    if ("errorCode" in validatedStudent) {
      return res.status(validatedStudent.errorCode).json({
        error: validatedStudent,
      });
    }

    if (userInfo.email) {
      await updateUserEmail(validatedUser, userInfo.email);
    }

    if (userInfo.newPassword) {
      await updateUserPassword(validatedUser, userInfo.newPassword);
    }

    const updatedStudent = await updateStudent(
      validatedStudent.id,
      userInfo.email,
      studentInfo
    );

    return res.status(200).json(updatedStudent);
  } catch (error) {
    return handleErrorResponse("update student profile", error, res);
  }
}

async function httpRequestMentorship(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const toEmail = req.body.toEmail;

    const student = await findStudentByUserId(userId);
    if (!student) {
      return handleBadRequestResponse(
        "This student does not exist in the system.",
        res
      );
    }

    await sendRequestMentorshipEmail(toEmail, student.name, student.id);

    return res.status(200).json("Mentorship Request has been sent.");
  } catch (error) {
    return handleErrorResponse("request mentorship", error, res);
  }
}

export {
  httpGetAllStudents,
  httpGetAllStudentsByMentor,
  httpGetStudentProfileByUserId,
  httpUpdateStudentProfile,
  httpRequestMentorship,
};
