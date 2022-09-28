import { Request, Response } from "express";

import {
  findAllStudents,
  findStudentById,
  findStudentByUserId,
  updateStudent,
  updateStudentMentorship,
  validateStudentExists,
} from "../../models/students.model";
import {
  findUserById,
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
import {
  sendCanceledMentorshipEmail,
  sendRequestMentorshipEmail,
} from "../../services/mail.service";
import { findMentorByEmail, findMentorById, findMentorByUserId } from "../../models/mentors.model";

async function httpGetAllStudents(req: Request, res: Response) {
  try {
    const students = await findAllStudents();
    return res.status(200).json(students);
  } catch (error) {
    return handleErrorResponse("get all students", error, res);
  }
}

async function httpGetStudentProfileByUserId(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const student = await findStudentByUserId(userId);
    if (!student) {
      return handleBadRequestResponse("This student does not exist in the system.", res);
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

    const updatedStudent = await updateStudent(validatedStudent.id, userInfo.email, studentInfo);

    return res.status(200).json(updatedStudent);
  } catch (error) {
    return handleErrorResponse("update student profile", error, res);
  }
}

async function httpRequestMentorship(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const mentorEmail = req.body.mentorEmail;

    if (!mentorEmail) {
      return handleBadRequestResponse("A mentor email must be provided.", res);
    }

    const student = await findStudentByUserId(userId);
    if (!student) {
      return handleBadRequestResponse("This student does not exist in the system.", res);
    }

    const mentor = await findMentorByEmail(mentorEmail);
    if (!mentor) {
      return handleBadRequestResponse("This mentor does not exist in the system.", res);
    }

    await updateStudentMentorship(student.id, mentor.id, true);

    let formattedName = student.name.replace(";", "");
    await sendRequestMentorshipEmail(mentorEmail, formattedName, student.id);

    return res.status(200).json("Mentorship Request has been sent.");
  } catch (error) {
    return handleErrorResponse("request mentorship", error, res);
  }
}

async function httpCancelMentorship(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const studentId = req.body.studentId;

    const user = await findUserById(userId);
    if (!user) {
      return handleNotFoundResponse("A user with this access token doesn't exist.", res);
    }

    let updatedStudent;
    if (user.role == "Student") {
      const student = await findStudentByUserId(user.id);
      if (!student) {
        return handleNotFoundResponse("A student with this ID doesn't exist.", res);
      }

      if (!student.mentorId) {
        return handleBadRequestResponse("Student doesn't have any mentor assigned.", res);
      }

      const mentor = await findMentorById(student.mentorId);
      if (!mentor) {
        return handleBadRequestResponse(
          "Mentor related to student doesn't exist in the system.",
          res
        );
      }

      updatedStudent = await updateStudentMentorship(student.id, null);
      let studentFormattedName = student.name.replace(";", "");
      await sendCanceledMentorshipEmail(mentor.email, studentFormattedName, studentFormattedName);
    } else {
      const mentor = await findMentorByUserId(userId);
      if (!mentor) {
        return handleNotFoundResponse("A mentor with this ID doesn't exist.", res);
      }

      if (!studentId) {
        return handleBadRequestResponse(
          "Mentors must provide a student id inorder to cancel student mentorship.",
          res
        );
      }

      const student = await findStudentById(studentId);
      if (!student) {
        return handleNotFoundResponse("A student with this ID doesn't exist.", res);
      }

      if (student.mentorId != mentor.id) {
        return handleBadRequestResponse(
          "This student does not have a mentorship agreement with this mentor.",
          res
        );
      }

      updatedStudent = await updateStudentMentorship(student.id, null);
      let mentorFormattedName = mentor.name.replace(";", "");
      let studentFormmatedName = student.name.replace(";", "");
      await sendCanceledMentorshipEmail(student.email, mentorFormattedName, studentFormmatedName);
    }

    return res.status(200).json(updatedStudent);
  } catch (error) {
    return handleErrorResponse("mentor cancels mentorship", error, res);
  }
}

export {
  httpGetAllStudents,
  httpGetStudentProfileByUserId,
  httpUpdateStudentProfile,
  httpRequestMentorship,
  httpCancelMentorship,
};
