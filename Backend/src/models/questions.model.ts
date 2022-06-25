import { prisma } from "../database";
import { Question } from "@prisma/client";
import { IErrorResponse, IQuestion } from "../types";
import { titleCase } from "../utils/helpers";


async function deleteQuestions(questions: IQuestion[], assessmentId: number) : Promise<void> {
  try {

    const existingQuestions = await prisma.question.findMany({
      where: {
        assessmentId: assessmentId,
      },
    });

    const questionIds = questions.map((q) => q.id);
    const questionsToDelete = existingQuestions.filter(
      (q) => !questionIds.includes(q.id)
    );
    
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

async function upsertQuestions(questions: IQuestion[], assessmentId: number) : Promise<Question[]> {
  try {

    let questionsToReturn: Question[] = [];
    for (const question of questions) {
      const questionId = (question.id) ?? -1;      
      const questionUpserted = await prisma.question.upsert({
        where: {
          id: questionId,
        },
        create: {
          question: question.question,
          type: question.type,
          options: question.options,
          assessmentId: assessmentId,
        },
        update: {
          question: question.question,
          type: question.type,
          options: question.options,
        }    
      });
      questionsToReturn.push(questionUpserted);
    }    

    return questionsToReturn;

  } catch (error) {
    throw error;
  }  
}


// --- Questions Helper Functions ---
function exclude<Question, Key extends keyof Question>(
  question: Question,
  ...keys: Key[]
): Question {
  for (let key of keys) {
    delete question[key];
  }
  return question;
}

function validateQuestionsFormat(
  questions: IQuestion[]
): IQuestion[] | IErrorResponse {

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

  return questions;

}


export {
  deleteQuestions,
  upsertQuestions,
  validateQuestionsFormat
}