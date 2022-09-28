import { prisma } from "../database";

import { Mentor } from "@prisma/client";

import { buildErrorObject, excludeFields } from "../utils/helpers";
import { IMentor, IErrorResponse } from "./../types/index.d";

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

    const mentorWithoutId = excludeFields(createdMentor, "id");
    return mentorWithoutId;
  } catch (error) {
    throw error;
  }
}

async function findAllMentors(): Promise<Mentor[]> {
  try {
    const mentors = await prisma.mentor.findMany({
      where: {
        user: {
          isApproved: true,
        },
      },
    });
    const mentorsWithoutId = mentors.map((mentor) => excludeFields(mentor, "userId"));
    return mentorsWithoutId;
  } catch (error) {
    throw error;
  }
}

async function findMentorByStudentId(studentId: string): Promise<Mentor[]> {
  try {
    const mentor = await prisma.mentor.findMany({
      where: {
        students: {
          some: {
            id: studentId,
          },
        },
      },
    });

    return mentor;
  } catch (error) {
    throw error;
  }
}

async function findMentorById(mentorId: string): Promise<Mentor | null> {
  try {
    const mentor = await prisma.mentor.findUnique({
      where: {
        id: mentorId,
      },
    });

    if (!mentor) {
      return null;
    }

    return mentor;
  } catch (error) {
    throw error;
  }
}

async function findMentorByUserId(userId: string): Promise<Mentor | null> {
  try {
    const mentor = await prisma.mentor.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!mentor) {
      return null;
    }

    return mentor;
  } catch (error) {
    throw error;
  }
}

async function findMentorByEmail(email: string): Promise<Mentor | null> {
  try {
    const mentor = await prisma.mentor.findUnique({
      where: {
        email: email,
      },
    });
    return mentor;
  } catch (error) {
    throw error;
  }
}

async function findUnApprovedMentors(): Promise<Mentor[]> {
  try {
    const mentors = await prisma.mentor.findMany({
      where: {
        user: {
          isApproved: false,
        },
      },
    });

    return mentors;
  } catch (error) {
    throw error;
  }
}

async function updateMentor(
  id: string,
  email: string,
  mentorInfo: IMentor
): Promise<Mentor | IErrorResponse> {
  try {
    const updatedMentor = await prisma.mentor.update({
      where: {
        id: id,
      },
      data: {
        name: !!mentorInfo.name ? mentorInfo.name : undefined,
        email: !!email ? email : undefined,
        phone: !!mentorInfo.phone ? mentorInfo.phone : undefined,
        gender: !!mentorInfo.gender ? mentorInfo.gender : undefined,
        description: mentorInfo.description,
        interests: mentorInfo.interests,
        department: !!mentorInfo.department ? mentorInfo.department : undefined,
        academicDegree: !!mentorInfo.academicDegree ? mentorInfo.academicDegree : undefined,
        office: mentorInfo.office,
        officeHours: mentorInfo.officeHours,
        profilePicture: mentorInfo.profilePicture,
      },
    });

    const mentorWithoutId = excludeFields(updatedMentor, "id");
    return mentorWithoutId;
  } catch (error) {
    throw error;
  }
}

async function validateMentorExists(userId: string): Promise<Mentor | IErrorResponse> {
  try {
    const mentor = await prisma.mentor.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!mentor) {
      return buildErrorObject(401, "This mentor does not exist in the system.");
    }

    return mentor;
  } catch (error) {
    throw error;
  }
}

export {
  createMentor,
  findAllMentors,
  findMentorByStudentId,
  findMentorById,
  findMentorByUserId,
  findMentorByEmail,
  findUnApprovedMentors,
  updateMentor,
  validateMentorExists,
};
