import { Answer, Prisma } from "@prisma/client";
import { prisma } from "../database";
import { IErrorResponse, IAnswer } from "./../types/index.d";

async function createAnswers(
  answers: IAnswer[]
): Promise<Prisma.BatchPayload | IErrorResponse> {
  try {
    let answersMap = new Map(answers.map((a) => [a.questionId, a]));
    let questionIds: number[] = [...answersMap.keys()];

    const questions = await prisma.question.findMany({
      where: {
        id: { in: questionIds },
      },
    });

    if (questions.length !== answers.length) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage:
          "Could not create answers because not all question Ids where found in the system. Please make sure you provide valid question ids.",
      };
      return error;
    }

    for (const question of questions) {
      const answer = answersMap.get(question.id);
      const isValidAnswer = question.options?.includes(answer?.answer ?? "");

      if (
        (question.type === "Select" || question.type === "Multi-Select") &&
        !isValidAnswer
      ) {
        const error: IErrorResponse = {
          errorCode: 400,
          errorMessage:
            "Could not create answer because it has provided an answer that is not within the available options of the question. If the question is of type 'Select' or 'Multi-Select', please provide a valid answer that are within the available options of that question.",
        };
        return error;
      }
    }

    const answerResponse = await prisma.answer.createMany({
      data: [...answers],
    });

    return answerResponse;
  } catch (error) {
    throw error;
  }
}

export { createAnswers };
