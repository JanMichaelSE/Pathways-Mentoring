import { prisma } from "../database";

import { Student } from "@prisma/client";

import { IStudent, IErrorResponse } from "./../types/index.d";
import { buildErrorObject, excludeFields } from "../utils/helpers";

async function createStudent(
  userId: string,
  email: string,
  studentInfo: IStudent
): Promise<Student> {
  try {
    const createdStudent = await prisma.student.create({
      data: {
        name: studentInfo.name,
        email: email,
        phone: studentInfo.phone,
        gender: studentInfo.gender,
        graduationDate: studentInfo.graduationDate
          ? new Date(studentInfo.graduationDate)
          : undefined,
        gpa: studentInfo.gpa,
        institution: studentInfo.institution,
        fieldOfStudy: studentInfo.fieldOfStudy,
        hasResearch: studentInfo.hasResearch,
        profilePicture: studentInfo.profilePicture,
        userId: userId,
      },
    });

    const studentWithoutId = excludeFields(createdStudent, "id");
    return studentWithoutId;
  } catch (error) {
    throw error;
  }
}

async function findAllStudents(): Promise<Student[]> {
  try {
    const students = await prisma.student.findMany();
    const studentsWithoutId = students.map((student) =>
      excludeFields(student, "id", "userId")
    );
    return studentsWithoutId;
  } catch (error) {
    throw error;
  }
}

async function findStudentsByMentor(mentorId: string): Promise<Student[]> {
  try {
    const students = await prisma.student.findMany({
      where: {
        mentorId: mentorId,
      },
    });

    const studentsWithoutId = students.map((student) =>
      excludeFields(student, "id", "mentorId", "userId")
    );
    return studentsWithoutId;
  } catch (error) {
    throw error;
  }
}

async function findStudentByUserId(userId: string): Promise<Student | null> {
  try {
    const student = await prisma.student.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!student) {
      return null;
    }

    const studentWithoutId = excludeFields(student, "id");
    return studentWithoutId;
  } catch (error) {
    throw error;
  }
}

async function updateStudent(
  id: string,
  studentInfo: IStudent
): Promise<Student | IErrorResponse> {
  try {
    const updatedStudent = await prisma.student.update({
      where: {
        id: id,
      },
      data: {
        name: !!studentInfo.name ? studentInfo.name : undefined,
        phone: !!studentInfo.phone ? studentInfo.phone : undefined,
        gender: !!studentInfo.gender ? studentInfo.gender : undefined,
        fieldOfStudy: studentInfo.fieldOfStudy
          ? studentInfo.fieldOfStudy
          : undefined,
        institution: studentInfo.institution
          ? studentInfo.institution
          : undefined,
        gpa: studentInfo.gpa,
        graduationDate: studentInfo.graduationDate
          ? new Date(studentInfo.graduationDate)
          : undefined,
        profilePicture: studentInfo.profilePicture,
      },
    });

    const studentWithoutId = excludeFields(updatedStudent, "id");
    return studentWithoutId;
  } catch (error) {
    throw error;
  }
}

async function validateStudentExists(
  userId: string
): Promise<Student | IErrorResponse> {
  try {
    const student = await prisma.student.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!student) {
      return buildErrorObject(
        401,
        "This student does not exist in the system."
      );
    }

    return student;
  } catch (error) {
    throw error;
  }
}

export {
  createStudent,
  findAllStudents,
  findStudentsByMentor,
  findStudentByUserId,
  updateStudent,
  validateStudentExists,
};