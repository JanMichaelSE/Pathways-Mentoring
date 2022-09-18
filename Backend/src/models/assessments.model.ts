import { prisma } from "../database";

import { Assessment } from "@prisma/client";

import { deleteQuestions, upsertQuestions, validateQuestionsFormat } from "./questions.model";

import { IAssessment, IErrorResponse, IQuestion } from "./../types/index.d";
import { buildErrorObject } from "../utils/helpers";
import { findAssessmentAnswersByUserId } from "./answers.model";

async function createAssessment(
  name: string,
  description: string | undefined,
  questions: IQuestion[]
): Promise<Assessment | IErrorResponse> {
  try {
    const questionsTransformed = validateQuestionsFormat(questions);
    if ("errorCode" in questionsTransformed) {
      return questionsTransformed;
    }

    const createdAssessment = await prisma.assessment.create({
      data: {
        name: name,
        description: description,
        questions: {
          createMany: {
            data: [...questionsTransformed],
          },
        },
      },
    });

    return createdAssessment;
  } catch (error) {
    throw error;
  }
}

async function findAllAssessments(): Promise<Assessment[]> {
  try {
    const assessments = await prisma.assessment.findMany();
    return assessments;
  } catch (error) {
    throw error;
  }
}

async function findPathwaysAssessmentDataByUserId(userId: string): Promise<IAssessment | null> {
  try {
    const assessment = await prisma.assessment.findFirst({
      where: {
        name: "Pathways Assessment",
      },
      include: {
        questions: true,
      },
    });

    if (!assessment) {
      return null;
    }

    const assessmentInfo = findAssessmentAnswersByUserId(assessment, assessment?.questions, userId);
    return assessmentInfo;
  } catch (error) {
    throw error;
  }
}

async function findAssessmentWithQuestionsById(id: number): Promise<Assessment | null> {
  try {
    const assessment = await prisma.assessment.findUnique({
      where: {
        id: id,
      },
      include: {
        questions: true,
      },
    });

    return assessment;
  } catch (error) {
    throw error;
  }
}

async function updateAssessment(
  assessment: IAssessment,
  assessmentId: number
): Promise<Assessment | IErrorResponse> {
  try {
    const existingAssessment = await findAssessmentWithQuestionsById(assessmentId);
    if (!existingAssessment) {
      return buildErrorObject(400, "An Assessment with this Id does not exist.");
    }

    const questionsTransformed = validateQuestionsFormat(assessment.questions);
    if ("errorCode" in questionsTransformed) {
      return questionsTransformed;
    }

    await prisma.assessment.update({
      where: {
        id: assessmentId,
      },
      data: {
        name: assessment.name,
        description: assessment.description,
      },
    });
    await deleteQuestions(questionsTransformed, assessmentId);
    await upsertQuestions(questionsTransformed, assessmentId);

    const updatedAssessment = await findAssessmentWithQuestionsById(assessmentId);
    // @ts-ignore - Ignore Null since we already checked if Id is Valid
    return updatedAssessment;
  } catch (error) {
    throw error;
  }
}

async function deleteAssessment(assessmentId: number): Promise<Assessment | IErrorResponse> {
  try {
    const existingAssessment = await prisma.assessment.findUnique({
      where: {
        id: assessmentId,
      },
    });
    if (!existingAssessment) {
      return buildErrorObject(400, "An Assessment with this Id does not exist.");
    }

    const deletedAssessment = await prisma.assessment.delete({
      where: {
        id: assessmentId,
      },
    });
    return deletedAssessment;
  } catch (error) {
    throw error;
  }
}

async function doesPathwayAssessmentExist(): Promise<boolean> {
  try {
    const assessment = await prisma.assessment.findFirst({
      where: {
        name: "Pathways Assessment",
      },
    });

    return !!assessment;
  } catch (error) {
    throw error;
  }
}

export {
  createAssessment,
  findAllAssessments,
  findAssessmentWithQuestionsById,
  findPathwaysAssessmentDataByUserId,
  updateAssessment,
  deleteAssessment,
  doesPathwayAssessmentExist,
};
