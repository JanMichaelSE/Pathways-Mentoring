import { prisma } from "../database";

import { Question } from "@prisma/client";

import { IErrorResponse, IQuestion } from "../types";
import { buildErrorObject, titleCase } from "../utils/helpers";

async function findDevelopmentPlanQuestionsWithAnswers(userId?: string): Promise<Question[]> {
  try {
    const questions = await prisma.question.findMany({
      where: {
        isDevelopmentPlan: true,
      },
      include: {
        answers: {
          where: {
            userId: userId,
          },
          select: {
            id: true,
            answer: true,
          },
        },
      },
    });

    return questions;
  } catch (error) {
    throw error;
  }
}

async function deleteQuestions(questions: IQuestion[], assessmentId: number): Promise<void> {
  try {
    const existingQuestions = await prisma.question.findMany({
      where: {
        assessmentId: assessmentId,
      },
    });

    const questionIds = questions.map((q) => q.id);
    const questionsToDelete = existingQuestions.filter((q) => !questionIds.includes(q.id));

    for (const question of questionsToDelete) {
      await prisma.question.delete({
        where: {
          id: question.id,
        },
      });
    }
  } catch (error) {
    throw error;
  }
}

async function upsertQuestions(questions: IQuestion[], assessmentId?: number): Promise<Question[]> {
  try {
    let questionsToReturn: Question[] = [];
    for (const question of questions) {
      const questionId = question.id ?? -1;
      const questionUpserted = await prisma.question.upsert({
        where: {
          id: questionId,
        },
        create: {
          question: question.question,
          type: question.type,
          options: question.options,
          assessmentId: assessmentId,
          isDevelopmentPlan: question.isDevelopmentPlan,
        },
        update: {
          question: question.question,
          type: question.type,
          options: question.options,
          isDevelopmentPlan: question.isDevelopmentPlan,
        },
      });
      questionsToReturn.push(questionUpserted);
    }

    return questionsToReturn;
  } catch (error) {
    throw error;
  }
}

function validateQuestionsFormat(questions: IQuestion[]): IQuestion[] | IErrorResponse {
  // Transform Questions to have proper title casing type
  questions.forEach((q) => {
    q.type = titleCase(q.type);
  });

  // Validate Questions have correct information
  for (const question of questions) {
    if (
      question.type != "Text" &&
      question.type != "Select" &&
      question.type != "Multi-select" &&
      question.type != "Rating" &&
      question.type != "Multi-Answer"
    ) {
      return buildErrorObject(
        400,
        `The question: "${question.question}" does not have a valid type assigned. Valid types are: "Text", "Select", "Multi-select", "Rating" and "Multi-Answer"`
      );
    } else if (
      (question.type === "Multi-select" ||
        question.type === "Select" ||
        question.type === "Rating") &&
      !question.options
    ) {
      return buildErrorObject(
        400,
        `The question: "${question.question}" does not have a options assigned. If questions is of type "Select", "Multi-select" or "Rating" options are required.`
      );
    }
  }

  return questions;
}

export {
  findDevelopmentPlanQuestionsWithAnswers,
  deleteQuestions,
  upsertQuestions,
  validateQuestionsFormat,
};
