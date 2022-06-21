import { prisma } from "../database";
import { Assessment } from "@prisma/client";
import { IErrorResponse, IQuestion } from "./../types/index.d";
import { titleCase } from "../utils/helpers";

async function createAssessment(
  name: string,
  description: string | undefined,
  questions: IQuestion[]
): Promise<Assessment | IErrorResponse> {
  try {

    // Transform Questions to have proper title casing type
    questions.forEach((q) => {
      q.type = titleCase(q.type);
    });

    // Validate Questions have correct information
    for (const question of questions) {
      if (
        question.type != "Text" &&
        question.type != "Select" &&
        question.type != "Multi-select"
      ) {
        const error: IErrorResponse = {
          errorCode: 400,
          errorMessage: `The question: "${question.question}" does not have a valid type assigned. Valid types are: "Text", "Select" and "Multi-select`,
        };
        return error;
      } else if (
        (question.type === "Multi-select" || question.type === "Select") &&
        !question.options
      ) {
        const error: IErrorResponse = {
          errorCode: 400,
          errorMessage: `The question: "${question.question}" does not have a options assigned. If questions is of type "Select" or "Multi-select", options are required.`,
        };
        return error;
      }
    }

    const createdAssessment = await prisma.assessment.create({
      data: {
        name: name,
        description: description,
        questions: {
          createMany: {
            data: [...questions],
          },
        },
      },
    });

    return createdAssessment;
    
  } catch (error) {
    throw error;
  }
}

async function deleteAssessment(
  assessmentId: number
): Promise<Assessment | IErrorResponse> {
  try {

    const existingAssessment = await prisma.assessment.findUnique({
      where: {
        id: assessmentId,
      },
    });
    if (!existingAssessment) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "An Assessment with this Id does not exist.",
      };
      return error;
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

function exclude<Assessment, Key extends keyof Assessment>(
  assessment: Assessment,
  ...keys: Key[]
): Assessment {
  for (let key of keys) {
    delete assessment[key];
  }
  return assessment;
}

export { 
  createAssessment, 
  deleteAssessment 
};
