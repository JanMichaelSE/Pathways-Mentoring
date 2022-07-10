import { Request, Response } from "express";

import {
  findMentorByUserId,
  findAllMentors,
  updateMentor,
} from "../../models/mentors.model";
import { updateUserEmail, updateUserPassword } from "../../models/users.model";

import { IUser, IMentor } from "./../../types/index.d";
import {
  formatPhoneNumber,
  handleBadRequestResponse,
  handleErrorResponse,
  isValidUUID,
  titleCase,
} from "../../utils/helpers";

async function httpGetAllMentors(req: Request, res: Response) {
  try {
    const mentors = await findAllMentors();
    return res.status(200).json(mentors);
  } catch (error) {
    return handleErrorResponse("get all mentors", error, res);
  }
}

async function httpGetMentorByUserId(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const isValidId = isValidUUID(userId);

    if (!isValidId) {
      return handleBadRequestResponse(
        "This Id passed in the URL parameter is not does not have a valid format.",
        res
      );
    }

    const mentorResponse = await findMentorByUserId(userId);
    if (!mentorResponse) {
      return handleBadRequestResponse(
        "This mentor does not exist in the system.",
        res
      );
    }

    return res.status(200).json(mentorResponse);
  } catch (error) {
    return handleErrorResponse("get mentor by user id", error, res);
  }
}

async function httpUpdateMentorProfile(req: Request, res: Response) {
  try {
    const userInfo: IUser = {
      id: req.body.userId,
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

    if (!userInfo.id) {
      return handleBadRequestResponse(
        "To update the mentor profile, the id of the user is required in the request.",
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

    const updateMentorResponse = await updateMentor(userInfo.id, mentorInfo);
    if ("errorCode" in updateMentorResponse) {
      return res.status(updateMentorResponse.errorCode).json({
        error: updateMentorResponse,
      });
    }

    return res.status(200).json(updateMentorResponse);
  } catch (error) {
    return handleErrorResponse("update mentor profile", error, res);
  }
}

export { httpGetAllMentors, httpUpdateMentorProfile, httpGetMentorByUserId };
