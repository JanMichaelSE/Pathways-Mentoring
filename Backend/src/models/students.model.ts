import { prisma } from "../database";
import { Student } from "@prisma/client";
import { IStudent, IErrorResponse } from './../types/index.d';

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
        graduationDate: studentInfo.graduationDate ? new Date(studentInfo.graduationDate) : undefined,
        gpa: studentInfo.gpa,
        institution: studentInfo.institution,
        fieldOfStudy: studentInfo.fieldOfStudy,
        hasResearch: studentInfo.hasResearch,
        profilePicture: studentInfo.profilePicture,
        userId: userId,
      },
    });

    const studentWithoutId = exclude(createdStudent, "id");
    return studentWithoutId;

  } catch (error) {
    throw error;
  }
}

async function getAllStudents() : Promise<Student[]> {
  try {

    const students = await prisma.student.findMany();
    const studentsWithoutId = students.map(student => exclude(student, 'id', 'userId'));
    return studentsWithoutId;

  } catch (error) {
    throw error;
  }
}

async function getStudentsByMentor(mentorId: string) : Promise<Student[]> {
  try {

    const students = await prisma.student.findMany({
      where: {
        mentorId: mentorId
      }
    });
    
    const studentsWithoutId = students.map(student => exclude(student, 'id', 'mentorId', 'userId'));
    return studentsWithoutId;

  } catch (error) {
    throw error;
  }
}

async function updateStudent(
  userId: string,
  studentInfo: IStudent
): Promise<Student | IErrorResponse> {
  try {

    const student = await prisma.student.findUnique({
      where: {
        userId: userId
      }
    });
    if (!student) {
      const error: IErrorResponse = {
        errorCode: 401,
        errorMessage:
          "This student does not exist in the system.",
      };
      return error;
    }
    

    const updatedStudent = await prisma.student.update({
      where: {
        id: student.id
      },
      data: {
        name: !!studentInfo.name ? studentInfo.name : undefined,
        phone: !!studentInfo.phone ? studentInfo.phone : undefined,
        gender: !!studentInfo.gender ? studentInfo.gender : undefined,
        fieldOfStudy: studentInfo.fieldOfStudy ? studentInfo.fieldOfStudy : undefined,
        institution: studentInfo.institution ? studentInfo.institution : undefined,
        gpa: studentInfo.gpa,
        graduationDate: studentInfo.graduationDate ? new Date(studentInfo.graduationDate) : undefined,
        profilePicture: studentInfo.profilePicture
      }
    })

    const studentWithoutId = exclude(updatedStudent, 'id');
    return studentWithoutId;

  } catch (error) {
    throw error;
  }
}


// --- Students Helper Functions ---
function exclude<Student, Key extends keyof Student>(
  student: Student,
  ...keys: Key[]
): Student {
  for (let key of keys) {
    delete student[key];
  }
  return student;
}

export {
  createStudent,
  getAllStudents,
  getStudentsByMentor,
  updateStudent
}