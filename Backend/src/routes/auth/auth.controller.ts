import { IMentor, IUser } from "./../../types/index.d";
import { Request, Response } from "express";
import { createStudent } from "../../models/students.model";
import { createUser, isUserAuthorized } from "../../models/users.model";
import { IErrorResponse, IStudent } from "../../types";
import { createMentor } from "../../models/mentors.model";
import {
  formatPhoneNumber,
  handleErrorResponse,
  titleCase,
} from "../../utils/helpers";

async function httpLogin(req: Request, res: Response) {
  try {
    const userInfo: IUser = {
      email: req.body.email,
      password: req.body.password,
    };

    if (!userInfo.email || !userInfo.password) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage:
          "User requires email and password to login into the system.",
      };
      return res.status(error.errorCode).json({ error });
    }

    const userResponse = await isUserAuthorized(
      userInfo.email,
      userInfo.password
    );
    if ("errorCode" in userResponse) {
      return res.status(userResponse.errorCode).json({
        error: userResponse,
      });
    }

    return res.status(200).json(userResponse);
  } catch (error) {
    return handleErrorResponse("login", error, res);
  }
}

async function httpSignupStudent(req: Request, res: Response) {
  try {
    const userInfo: IUser = {
      email: req.body.email,
      password: req.body.password,
      role: titleCase(req.body.role),
    };
    const studentInfo: IStudent = {
      name: titleCase(req.body.name),
      phone: formatPhoneNumber(req.body.phone),
      gender: titleCase(req.body.gender),
      graduationDate: req.body.graduationDate,
      gpa: req.body.gpa,
      institution: titleCase(req.body.institution),
      fieldOfStudy: titleCase(req.body.fieldOfStudy),
      hasResearch: req.body.hasResearch,
      profilePicture: req.body.profilePicture,
    };

    if (
      !userInfo.email ||
      !userInfo.password ||
      !userInfo.role ||
      !studentInfo.name ||
      !studentInfo.gender ||
      !studentInfo.fieldOfStudy ||
      !studentInfo.institution
    ) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "Student is missing required fields for creation.",
      };
      return res.status(error.errorCode).json({ error });
    }

    if (userInfo.role !== "Student") {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage:
          "Expected a role of 'student' but received " +
          userInfo.role +
          " instead. Please provide the 'student' role when creating a student.",
      };
      return res.status(error.errorCode).json({ error });
    }

    const userResponse = await createUser(
      userInfo.email,
      userInfo.password,
      userInfo.role
    );
    if ("errorCode" in userResponse) {
      return res.status(userResponse.errorCode).json({
        error: userResponse,
      });
    }

    const studentResponse = await createStudent(
      userResponse.id,
      userInfo.email,
      studentInfo
    );
    return res.status(200).json(studentResponse);
  } catch (error) {
    return handleErrorResponse("signup student", error, res);
  }
}

async function httpSignupMentor(req: Request, res: Response) {
  try {
    const userInfo: IUser = {
      email: req.body.email,
      password: req.body.password,
      role: titleCase(req.body.role),
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

    if (
      !userInfo.email ||
      !userInfo.password ||
      !userInfo.role ||
      !mentorInfo.name ||
      !mentorInfo.gender ||
      !mentorInfo.phone ||
      !mentorInfo.department ||
      !mentorInfo.facultyStatus ||
      !mentorInfo.academicDegree
    ) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "Mentor is missing required fields for creation.",
      };
      return res.status(error.errorCode).json({ error });
    }

    if (userInfo.role !== "Mentor") {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage:
          "Expected a role of 'mentor' but received '" +
          userInfo.role +
          "' instead. Please provide the 'mentor' role when creating a mentor.",
      };
      return res.status(error.errorCode).json({ error });
    }

    const userResponse = await createUser(
      userInfo.email,
      userInfo.password,
      userInfo.role
    );
    if ("errorCode" in userResponse) {
      return res.status(userResponse.errorCode).json({
        error: userResponse,
      });
    }

    const mentorResponse = await createMentor(
      userResponse.id,
      userInfo.email,
      mentorInfo
    );
    return res.status(200).json(mentorResponse);
  } catch (error) {
    return handleErrorResponse("signup mentor", error, res);
  }
}

export { httpLogin, httpSignupStudent, httpSignupMentor };
