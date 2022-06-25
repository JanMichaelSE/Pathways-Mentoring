import { Mentor } from "@prisma/client";
import { prisma } from "../database";
import { IMentor, IErrorResponse } from './../types/index.d';


async function createMentor(
  userId: string,
  email: string,
  mentorInfo: IMentor
) : Promise<Mentor | IErrorResponse> {
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

async function findAllMentors() : Promise<Mentor[]> {
  try {
    const mentors = await prisma.mentor.findMany();
    const mentorsWithoutId = mentors.map(mentor => exclude(mentor, 'id'));
    return mentorsWithoutId;
  } catch (error) {
    throw error;
  }
}

async function findMentorByUserId(userId: string) : Promise<Mentor | null> {
  try {
    const mentor = await prisma.mentor.findUnique({
      where: {
        userId: userId
      }
    });

    if (!mentor) {
      return null;
    }
    
    const mentorWithoutId = exclude(mentor, 'id');
    return mentorWithoutId;

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

async function updateMentor(userId: string, mentorInfo: IMentor) : Promise<Mentor | IErrorResponse> {
  try {
    
    const mentor = await prisma.mentor.findUnique({
      where: {
        userId: userId
      }
    });
    if (!mentor) {
      const error: IErrorResponse = {
        errorCode: 401,
        errorMessage:
          "This mentor does not exist in the system.",
      };
      return error;
    }

    const updatedMentor = await prisma.mentor.update({
      where: {
        id: mentor.id
      },
      data: {
        name: !!mentorInfo.name ? mentorInfo.name : undefined,
        phone: !!mentorInfo.phone ? mentorInfo.phone : undefined,
        gender: !!mentorInfo.gender ? mentorInfo.gender : undefined,
        description: mentorInfo.description,
        interests: mentorInfo.interests,
        department: !!mentorInfo.department ? mentorInfo.department : undefined,
        academicDegree: !!mentorInfo.academicDegree ? mentorInfo.academicDegree : undefined,
        office: mentorInfo.office,
        officeHours: mentorInfo.officeHours,
        profilePicture: mentorInfo.profilePicture
      }
    });

    const mentorWithoutId = exclude(updatedMentor, 'id');
    return mentorWithoutId;

  } catch (error) {
    throw error;
  }
}


// --- Mentor Helper Functions ---
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
  findAllMentors,
  findMentorByUserId,
  findMentorByEmail,
  updateMentor
}