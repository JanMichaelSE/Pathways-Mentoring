import { Request, Response } from "express";
import { createStudent } from "../../models/students.model";
import { createUser } from "../../models/users.model";
import { IErrorResponse, IStudent } from "../../types";

async function httpLogin(req: Request, res: Response) {
  res.status(200).send("Login Endpoint");
}

async function httpSignupStudent(req: Request, res: Response) {
  try {

    const studentInfo: IStudent = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      role: req.body.role,
      phone: req.body.phone,
      gender: req.body.gender,
      graduationDate: req.body.graduationDate,
      gpa: req.body.gpa,
      institution: req.body.institution,
      fieldOfStudy: req.body.fieldOfStudy,
      hasResearch: req.body.hasResearch,
      profilePicture: req.body.profilePicture,
    };
  
    if (
      !studentInfo.name ||
      !studentInfo.password ||
      !studentInfo.email ||
      !studentInfo.role ||
      !studentInfo.gender ||
      !studentInfo.fieldOfStudy ||
      !studentInfo.institution
    ) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "Student is missing required fields for creation."
      };
      return res.status(error.errorCode).json({ error });
    }
  
    const userResponse = await createUser(
      studentInfo.name,
      studentInfo.email,
      studentInfo.password,
      studentInfo.role
    );
    if ('errorCode' in userResponse) {
      return res.status(userResponse.errorCode).json({
        error: userResponse
      });
    }
  
    const studentResponse = await createStudent(studentInfo, userResponse.id);
  
    res.status(200).json(studentResponse);

  } catch (error) {
    console.log('Student Signup Failed at: ', error);
    
    const errorResponse: IErrorResponse = {
      errorCode: 500,
      errorMessage: "The resquest to signup student failed. Please report this to Tech Support for further investigation."
    };
    return res.status(errorResponse.errorCode).json({
      error: errorResponse
    });
  }  
}

async function httpSignupMentor(req: Request, res: Response) {
  res.status(200).send("Singup for Mentors Endpoint");
}

export { httpLogin, httpSignupStudent, httpSignupMentor };
