import { Request, Response } from "express";

import { IMentor, IUser, IStudent } from "./../../types/index.d";

import { createStudent } from "../../models/students.model";
import {
  createUser,
  findEmailById,
  findUserByEmail,
  findUserById,
  getUserTokens,
  isUserAuthorized,
  updateUserEmail,
  updateUserPassword,
  updateUserTokens,
  validateProfileUpdate,
} from "../../models/users.model";
import { createMentor } from "../../models/mentors.model";

import {
  buildErrorObject,
  excludeFields,
  formatPhoneNumber,
  handleBadRequestResponse,
  handleErrorResponse,
  handleNotFoundResponse,
  isValidUUID,
  titleCase,
} from "../../utils/helpers";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../services/auth.service";
import { sendRequestMentorAccessEmail, sendResetPasswordEmail } from "../../services/mail.service";

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

    const userResponse = await isUserAuthorized(userInfo.email, userInfo.password);
    if ("errorCode" in userResponse) {
      return res.status(userResponse.errorCode).json({
        error: userResponse,
      });
    }

    const accessToken = generateAccessToken(userResponse.id);
    const refreshToken = generateRefreshToken(userResponse.id);

    await updateUserTokens(userResponse.id, accessToken, refreshToken);

    return res.status(200).json({
      accessToken,
      refreshToken,
      email: userResponse.email,
      role: userResponse.role,
      isApproved: userResponse.isApproved,
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
      return handleBadRequestResponse("Student is missing required fields for creation.", res);
    }

    if (userInfo.role !== "Student") {
      return handleBadRequestResponse(
        "Expected a role of 'student' but received " +
          userInfo.role +
          " instead. Please provide the 'student' role when creating a student.",
        res
      );
    }

    const userResponse = await createUser(userInfo.email, userInfo.password, userInfo.role, true);
    if ("errorCode" in userResponse) {
      return res.status(userResponse.errorCode).json({
        error: userResponse,
      });
    }

    const accessToken = generateAccessToken(userResponse.id);
    const refreshToken = generateRefreshToken(userResponse.id);
    await updateUserTokens(userResponse.id, accessToken, refreshToken);

    const studentResponse = await createStudent(userResponse.id, userInfo.email, studentInfo);

    return res.status(200).json({
      accessToken,
      refreshToken,
      ...studentResponse,
      isApproved: true,
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
      email: req.body.email,
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
      return handleBadRequestResponse("Mentor is missing required fields for creation.", res);
    }

    if (userInfo.role !== "Mentor") {
      return handleBadRequestResponse(
        "Expected a role of 'mentor' but received '" +
          userInfo.role +
          "' instead. Please provide the 'mentor' role when creating a mentor.",
        res
      );
    }

    const userResponse = await createUser(userInfo.email, userInfo.password, userInfo.role, false);
    if ("errorCode" in userResponse) {
      return res.status(userResponse.errorCode).json({
        error: userResponse,
      });
    }

    const mentorResponse = await createMentor(userResponse.id, userInfo.email, mentorInfo);
    if ("errorCode" in mentorResponse) {
      return res.status(mentorResponse.errorCode).json({
        error: mentorResponse,
      });
    }

    await sendRequestMentorAccessEmail(mentorResponse.id, mentorInfo);

    return res.status(200).json({
      ...mentorResponse,
      isApproved: false,
    });
  } catch (error) {
    return handleErrorResponse("signup mentor", error, res);
  }
}

async function httpSignupAdmin(req: Request, res: Response) {
  try {
    const userInfo = {
      email: req.body.email,
      password: req.body.password,
      role: "Admin",
    };

    if (!userInfo.email || !userInfo.password || !userInfo.role) {
      return handleBadRequestResponse(
        "The following fields need to be provided in order to signup: 'email' and 'password'.",
        res
      );
    }

    const createdUser = await createUser(userInfo.email, userInfo.password, userInfo.role, true);
    if ("errorCode" in createdUser) {
      return res.status(createdUser.errorCode).json({
        error: createdUser,
      });
    }

    const accessToken = generateAccessToken(createdUser.id);
    const refreshToken = generateRefreshToken(createdUser.id);
    const updatedUser = await updateUserTokens(createdUser.id, accessToken, refreshToken);

    return res.status(200).json(updatedUser);
  } catch (error) {
    return handleErrorResponse("signup admin", error, res);
  }
}

async function httpGetAdminProfile(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const user = await findEmailById(userId);
    if (!user) {
      return handleNotFoundResponse(
        "A user with this Id wasn't found.Please provide a valid Id.",
        res
      );
    }

    return res.status(200).json(user);
  } catch (error) {
    return handleErrorResponse("get admin profile", error, res);
  }
}

async function httpUpdateAdmin(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const isValidId = isValidUUID(userId);

    if (!isValidId) {
      return handleBadRequestResponse(
        "This Id passed in the URL parameter is not does not have a valid format.",
        res
      );
    }

    const userInfo: IUser = {
      id: userId,
      email: req.body.email,
      password: req.body.currentPassword,
      newPassword: req.body.newPassword,
      isApproved: true,
    };
    const validatedUserResponse = await validateProfileUpdate(userInfo);
    if ("errorCode" in validatedUserResponse) {
      return res.status(validatedUserResponse.errorCode).json({
        error: validatedUserResponse,
      });
    }

    if (userInfo.email) {
      await updateUserEmail(validatedUserResponse, userInfo.email);
    }

    if (userInfo.newPassword) {
      await updateUserPassword(validatedUserResponse, userInfo.newPassword);
    }

    const updatedUser = await findUserById(userId);
    if (!updatedUser) {
      return handleBadRequestResponse(
        "Couldn't find user in the system. Please provide valid Access Token",
        res
      );
    }

    const userFiltered = excludeFields(updatedUser, "id", "password", "passwordSalt");

    return res.status(200).json(userFiltered);
  } catch (error) {
    return handleErrorResponse("update admin", error, res);
  }
}

async function httpLogout(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const isValidId = isValidUUID(userId);

    if (!isValidId) {
      return handleBadRequestResponse(
        "This Id passed in the URL parameter is not does not have a valid format.",
        res
      );
    }

    await updateUserTokens(userId, "", "");
    return res.status(200).json("User has been logged out");
  } catch (error) {
    return handleErrorResponse("logout", error, res);
  }
}

async function httpRefreshToken(req: Request, res: Response) {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      const error = buildErrorObject(401, "Token was not provided.");
      return res.status(error.errorCode).json({ error: error });
    }

    const userRefreshToken = await getUserTokens(refreshToken);
    if (!userRefreshToken || refreshToken !== userRefreshToken.refreshToken) {
      const error = buildErrorObject(401, "Token is not valid for this users.");
      return res.status(error.errorCode).json({ error: error });
    }

    const verifyTokenResponse = verifyRefreshToken(refreshToken);
    if ("errorCode" in verifyTokenResponse) {
      return res.status(verifyTokenResponse.errorCode).json({
        error: verifyTokenResponse,
      });
    }

    const [accessToken, refreshedToken] = verifyTokenResponse;
    await updateUserTokens(userRefreshToken.id, accessToken, refreshedToken);

    return res.status(200).json({ accessToken: accessToken, refreshedToken: refreshedToken });
  } catch (error) {
    return handleErrorResponse("refresh token", error, res);
  }
}

async function httpForgotPassword(req: Request, res: Response) {
  try {
    const email = req.body.email;

    if (!email) {
      return handleBadRequestResponse(
        "Can't reset password without providing an email address.",
        res
      );
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return handleBadRequestResponse(
        "Couldn't find user in the system. Please provide valid email address.",
        res
      );
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    await updateUserTokens(user.id, accessToken, refreshToken);
    await sendResetPasswordEmail(email, accessToken);

    return res.status(200).json({ status: 200, message: "Reset Password Email has been sent." });
  } catch (error) {
    return handleErrorResponse("forgot password", error, res);
  }
}

async function httpResetPassword(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const password = req.body.password;

    if (!userId && !password) {
      return handleBadRequestResponse(
        "Can't reset password without providing an email address.",
        res
      );
    }

    const user = await findUserById(userId);
    if (!user) {
      return handleBadRequestResponse(
        "Couldn't find user in the system. Please provide valid Access Token",
        res
      );
    }

    const updatePasswordResponse = await updateUserPassword(user, password);
    return res.status(200).json(updatePasswordResponse);
  } catch (error) {
    return handleErrorResponse("reset password", error, res);
  }
}

export {
  httpLogin,
  httpSignupStudent,
  httpSignupMentor,
  httpSignupAdmin,
  httpGetAdminProfile,
  httpUpdateAdmin,
  httpLogout,
  httpRefreshToken,
  httpForgotPassword,
  httpResetPassword,
};
