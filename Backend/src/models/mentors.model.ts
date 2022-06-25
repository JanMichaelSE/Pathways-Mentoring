import { Mentor } from "@prisma/client";
import { prisma } from "../database";
import { IMentor, IErrorResponse } from './../types/index.d';


async function createMentor(
  userId: string,
  email: string,
  mentorInfo: IMentor
): Promise<Mentor | IErrorResponse> {
  try {

    const createdMentor = await prisma.mentor.create({
      data: {
        name: mentorInfo.name,
        email: email,
        phone: mentorInfo.phone,
        gender: mentorInfo.gender,
        department: mentorInfo.department,
        academicDegree: mentorInfo.academicDegree,
        officeHours: mentorInfo.officeHours,
        office: mentorInfo.office,
        interests: mentorInfo.interests,
        description: mentorInfo.description,
        facultyStatus: mentorInfo.facultyStatus,
        profilePicture: mentorInfo.profilePicture,
        userId: userId,
      },
    });

    const mentorWithoutId = exclude(createdMentor, "id");
    return mentorWithoutId;
    
  } catch (error) {
    throw error;
  }
}

async function getAllMentors() : Promise<Mentor[]> {
  try {
    const mentors = await prisma.mentor.findMany();
    const mentorsWithoutId = mentors.map(mentor => exclude(mentor, 'id'));
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