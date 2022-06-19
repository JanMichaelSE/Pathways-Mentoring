import { Mentor } from "@prisma/client";
import { prisma } from "../database";
import { IMentor, IErrorResponse } from './../types/index.d';


async function createMentor(mentor: IMentor, userId: string) : Promise<Mentor | IErrorResponse> {
  try {
    const createdMentor = await prisma.mentor.create({
      data: {
        name: mentor.name,
        email: mentor.email,
        phone: mentor.phone,
        gender: mentor.gender,
        department: mentor.department,
        academicDegree: mentor.academicDegree,
        officeHours: mentor.officeHours,
        office: mentor.office,
        interests: mentor.interests,
        description: mentor.description,
        facultyStatus: mentor.facultyStatus,
        profilePicture: mentor.profilePicture,
        userId: userId
      }
    });
    
    const mentorWithoutId = exclude(createdMentor, 'id', 'userId');
    return mentorWithoutId;

  } catch (error) {
    throw error
  }
}

async function getAllMentors() : Promise<Mentor[]> {
  try {
    const mentors = await prisma.mentor.findMany();
    const mentorsWithoutId = mentors.map(mentor => exclude(mentor, 'id', 'userId'));
    return mentorsWithoutId;
  } catch (error) {
    throw error;
  }
}

async function findMentorByEmail(email: string) : Promise<Mentor | null> {
  try {
    const mentor = await prisma.mentor.findUnique({
      where: {
        email: email
      }
    });
    return mentor;
  } catch (error) {
    throw error;
  }
}

function exclude<Mentor, Key extends keyof Mentor>(
  mentor: Mentor,
  ...keys: Key[]
): Mentor {
  for (let key of keys) {
    delete mentor[key];
  }
  return mentor;
}


export {
  createMentor,
  getAllMentors,
  findMentorByEmail
}