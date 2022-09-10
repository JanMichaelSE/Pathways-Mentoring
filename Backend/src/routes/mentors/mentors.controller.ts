import { Request, Response } from "express";

import {
  findMentorByUserId,
  findAllMentors,
  updateMentor,
  validateMentorExists,
} from "../../models/mentors.model";
import {
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
  titleCase,
} from "../../utils/helpers";
import { findStudentsByMentor } from "../../models/students.model";

async function httpGetAllMentors(req: Request, res: Response) {
  try {
    const mentors = await findAllMentors();
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
      return handleNotFoundResponse("A mentor with this email doesn't exist.", res);
    }

    const students = await findStudentsByMentor(mentor.id);
    return res.status(200).json(students);
  } catch (error) {
    return handleErrorResponse("get students by mentor", error, res);
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
    return res.status(200).json("Accept Mentorship Endpoint");
  } catch (error) {
    return handleErrorResponse("accept mentorship request", error, res);
  }
}

export {
  httpGetAllMentors,
  httpGetMentorProfileByUserId,
  httpGetAllStudentsByMentor,
  httpUpdateMentorProfile,
  httpAcceptMentorshipRequest,
};
