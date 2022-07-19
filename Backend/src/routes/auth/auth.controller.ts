import { Request, Response } from "express";

import { createStudent } from "../../models/students.model";
import {
  createUser,
  getUserRefreshToken,
  isUserAuthorized,
  updateUserRefreshToken,
} from "../../models/users.model";
import { createMentor } from "../../models/mentors.model";

import { IMentor, IUser, IStudent } from "./../../types/index.d";
import {
  buildErrorObject,
  formatPhoneNumber,
  handleBadRequestResponse,
  handleErrorResponse,
  titleCase,
} from "../../utils/helpers";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../services/auth.service";

async function httpRefreshToken(req: Request, res: Response) {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      const error = buildErrorObject(401, "Token was not provided.");
      return res.status(error.errorCode).json({ error: error });
    }

    const userRefreshToken = await getUserRefreshToken(refreshToken);
    if (!userRefreshToken || refreshToken !== userRefreshToken.refreshToken) {
      const error = buildErrorObject(403, "Token is not valid for this users.");
      return res.status(error.errorCode).json({ error: error });
    }

    const verifyTokenResponse = verifyRefreshToken(refreshToken);
    if ("errorCode" in verifyTokenResponse) {
      return res.status(verifyTokenResponse.errorCode).json({
        error: verifyTokenResponse,
      });
    }

    const [accessToken, refreshedToken] = verifyTokenResponse;
    await updateUserRefreshToken(userRefreshToken.id, refreshedToken);

    return res
      .status(200)
      .json({ accessToken: accessToken, refreshedToken: refreshedToken });
  } catch (error) {
    return handleErrorResponse("refresh token", error, res);
  }
}

async function httpLogin(req: Request, res: Response) {
  try {
    const userInfo: IUser = {
      email: req.body.email,
      password: req.body.password,
    };

    if (!userInfo.email || !userInfo.password) {
      return handleBadRequestResponse(
        "User requires email and password to login into the system.",
        res
      );
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

    const accessToken = generateAccessToken(userResponse.id);
    const refreshToken = generateRefreshToken(userResponse.id);

    await updateUserRefreshToken(userResponse.id, refreshToken);

    return res.status(200).json({
      accessToken,
      refreshToken,
      email: userResponse.email,
      role: userResponse.role,
    });
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
      return handleBadRequestResponse(
        "Student is missing required fields for creation.",
        res
      );
    }

    if (userInfo.role !== "Student") {
      return handleBadRequestResponse(
        "Expected a role of 'student' but received " +
          userInfo.role +
          " instead. Please provide the 'student' role when creating a student.",
        res
      );
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

    const accessToken = generateAccessToken(userResponse.id);
    const refreshToken = generateRefreshToken(userResponse.id);
    await updateUserRefreshToken(userResponse.id, refreshToken);

    const studentResponse = await createStudent(
      userResponse.id,
      userInfo.email,
      studentInfo
    );

    return res.status(200).json({
      accessToken,
      refreshToken,
      ...studentResponse,
    });
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
      return handleBadRequestResponse(
        "Mentor is missing required fields for creation.",
        res
      );
    }

    if (userInfo.role !== "Mentor") {
      return handleBadRequestResponse(
        "Expected a role of 'mentor' but received '" +
          userInfo.role +
          "' instead. Please provide the 'mentor' role when creating a mentor.",
        res
      );
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

    const accessToken = generateAccessToken(userResponse.id);
    const refreshToken = generateRefreshToken(userResponse.id);
    await updateUserRefreshToken(userResponse.id, refreshToken);

    const mentorResponse = await createMentor(
      userResponse.id,
      userInfo.email,
      mentorInfo
    );

    return res.status(200).json({
      accessToken,
      refreshToken,
      ...mentorResponse,
    });
  } catch (error) {
    return handleErrorResponse("signup mentor", error, res);
  }
}

export { httpRefreshToken, httpLogin, httpSignupStudent, httpSignupMentor };
