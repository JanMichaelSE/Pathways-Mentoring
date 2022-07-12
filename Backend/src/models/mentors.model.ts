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
    const mentors = await prisma.mentor.findMany();
    const mentorsWithoutId = mentors.map((mentor) =>
      excludeFields(mentor, "id")
    );
    return mentorsWithoutId;
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

    const mentorWithoutId = excludeFields(mentor, "id");
    return mentorWithoutId;
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

async function updateMentor(
  id: string,
  mentorInfo: IMentor
): Promise<Mentor | IErrorResponse> {
  try {
    const updatedMentor = await prisma.mentor.update({
      where: {
        id: id,
      },
      data: {
        name: !!mentorInfo.name ? mentorInfo.name : undefined,
        phone: !!mentorInfo.phone ? mentorInfo.phone : undefined,
        gender: !!mentorInfo.gender ? mentorInfo.gender : undefined,
        description: mentorInfo.description,
        interests: mentorInfo.interests,
        department: !!mentorInfo.department ? mentorInfo.department : undefined,
        academicDegree: !!mentorInfo.academicDegree
          ? mentorInfo.academicDegree
          : undefined,
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

async function validateMentorExists(
  userId: string
): Promise<Mentor | IErrorResponse> {
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
  findMentorByUserId,
  findMentorByEmail,
  updateMentor,
  validateMentorExists,
};
