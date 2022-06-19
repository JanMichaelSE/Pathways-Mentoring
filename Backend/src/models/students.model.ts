import { prisma } from "../database";
import { Student } from "@prisma/client";
import { IStudent } from './../types/index.d';

async function createStudent(student: IStudent, userId: string) : Promise<Student>{
  try {

    const createdStudent = await prisma.student.create({
      data: {
        name: student.name,
        email: student.email,
        phone: student.phone,
        gender: student.gender,
        graduationDate: new Date(student.graduationDate),
        gpa: student.gpa,
        institution: student.institution,
        fieldOfStudy: student.fieldOfStudy,
        hasResearch: student.hasResearch,
        profilePicture: student.profilePicture,
        userId: userId
      }
    });
    
    const studentWithoutId = exclude(createdStudent, 'id', 'userId');
    return studentWithoutId;

  } catch (error) {
    throw error
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
  getStudentsByMentor
}