import { Request, Response } from "express";
import { IErrorResponse } from "../../types";
import { findMentorByEmail } from "../../models/mentors.model";
import { getAllStudents, getStudentsByMentor } from "../../models/students.model";
import { handleErrorResponse } from "../../utils/helpers";


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


export {
  httpGetAllStudents,
  httpGetAllStudentsByMentor
}