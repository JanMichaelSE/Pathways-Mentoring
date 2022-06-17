import { IMentor } from './../../types/index.d';
import { Request, Response } from "express";
import { createStudent } from "../../models/students.model";
import { createUser } from "../../models/users.model";
import { IErrorResponse, IStudent } from "../../types";
import { createMentor } from '../../models/mentors.model';

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

    if (studentInfo.role !== "student") {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "Expected a role of 'student' but received " + studentInfo.role + " instead. Please provide the 'student' role when creating a student."
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
  try {

    const mentorInfo: IMentor = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      role: req.body.role,
      phone: req.body.phone,
      gender: req.body.gender,
      department: req.body.department,
      academicDegree: req.body.academicDegree,
      office: req.body.office,
      officeHours: req.body.officeHours,
      facultyStatus: req.body.facultyStatus,
      interests: req.body.interests,
      description: req.body.description,
      profilePicture: req.body.profilePicture,
    };
  
    if (
      !mentorInfo.name ||
      !mentorInfo.password ||
      !mentorInfo.email ||
      !mentorInfo.role ||
      !mentorInfo.gender ||
      !mentorInfo.phone ||
      !mentorInfo.department ||
      !mentorInfo.facultyStatus ||
      !mentorInfo.academicDegree
    ) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "Mentor is missing required fields for creation."
      };
      return res.status(error.errorCode).json({ error });
    }

    if (mentorInfo.role !== "mentor") {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "Expected a role of 'mentor' but received '" + mentorInfo.role + "' instead. Please provide the 'mentor' role when creating a mentor."
      };
      return res.status(error.errorCode).json({ error });
    }

  
    const userResponse = await createUser(
      mentorInfo.name,
      mentorInfo.email,
      mentorInfo.password,
      mentorInfo.role
    );
    if ('errorCode' in userResponse) {
      return res.status(userResponse.errorCode).json({
        error: userResponse
      });
    }
  
    const mentorResponse = await createMentor(mentorInfo, userResponse.id);
  
    res.status(200).json(mentorResponse);

  } catch (error) {
    const errorResponse: IErrorResponse = {
      errorCode: 500,
      errorMessage: "The resquest to signup mentor failed. Please report this to Tech Support for further investigation."
    };
    return res.status(errorResponse.errorCode).json({
      error: errorResponse
    });
  }  
}

export { httpLogin, httpSignupStudent, httpSignupMentor };
