import { IUser, IStudent } from './../../types/index.d';
import { Request, Response } from "express";
import { IErrorResponse } from "../../types";
import { findMentorByEmail } from "../../models/mentors.model";
import { getAllStudents, getStudentsByMentor, updateStudent } from "../../models/students.model";
import { formatPhoneNumber, handleErrorResponse, titleCase } from "../../utils/helpers";
import { updateUserEmail, updateUserPassword } from '../../models/users.model';


async function httpGetAllStudents(req: Request, res: Response) {  
  try {

    const students = await getAllStudents();
    return res.status(200).json(students);
    
  } catch (error) {
    return handleErrorResponse('get all students', error, res);
  }
}

async function httpGetAllStudentsByMentor(req: Request, res: Response) {
  try {

    const requestEmail = req.params.email;
    const mentor = await findMentorByEmail(requestEmail);

    if (!mentor) {
      const error: IErrorResponse = {
        errorCode: 404,
        errorMessage: "A mentor with this email doesn't exist."
      };
      return res.status(error.errorCode).json({ error });
    }

    const students = await getStudentsByMentor(mentor.id);
    return res.status(200).json(students);
    
  } catch (error) {
    return handleErrorResponse('get students by mentor', error, res);
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
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage:
          "To update the student profile, the id of the user is required in the request.",
      };
      return res.status(error.errorCode).json({ error });
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
  httpUpdateStudentProfile
}