import { prisma } from "../database";

import { Prisma } from "@prisma/client";

import { buildErrorObject, excludeFields } from "../utils/helpers";
import {
  IErrorResponse,
  IAnswer,
  IAnsweredAssessment,
  IAssessmentAnswers,
  IAnswerResposne,
} from "./../types/index.d";

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
      return buildErrorObject(
        400,
        "Could not create answers because not all question Ids where found in the system. Please make sure you provide valid question ids."
      );
    }

    for (const question of questions) {
      const answer = answersMap.get(question.id);
      const isValidAnswer = question.options?.includes(answer?.answer ?? "");

      if (
        (question.type === "Select" || question.type === "Multi-select") &&
        !isValidAnswer
      ) {
        return buildErrorObject(
          400,
          "Could not create answer because it has provided an answer that is not within the available options of the question. If the question is of type 'Select' or 'Multi-Select', please provide a valid answer that are within the available options of that question."
        );
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

async function findAnswersByAssessment(
  assessmentId: number
): Promise<IAnsweredAssessment | IErrorResponse> {
  try {
    const assessment = await prisma.assessment.findUnique({
      where: {
        id: assessmentId,
      },
    });

    if (!assessment) {
      return buildErrorObject(
        400,
        "An assessment with this Id does not exist in the system."
      );
    }

    const questions = await prisma.question.findMany({
      where: {
        assessmentId: assessment.id,
      },
    });
    const questionsMap = new Map(
      questions.map((question) => [question.id, question])
    );

    const questionIds = [...questionsMap.keys()];
    const answers = await prisma.answer.findMany({
      where: {
        questionId: { in: questionIds },
      },
    });

    let assessmentAnswers: IAssessmentAnswers[] = [];
    let answersByQuestion: IAnswerResposne[] = [];
    const sortedAnswers = answers.sort((answer) => answer.questionId);
    const sortedAnswersLength = sortedAnswers.length;
    for (let index = 0; index < sortedAnswersLength; index++) {
      const question = questionsMap.get(sortedAnswers[index].questionId);
      const answer = excludeFields(
        sortedAnswers[index],
        "userId",
        "id",
        "questionId"
      );
      answersByQuestion.push(answer);

      if (
        question &&
        (sortedAnswersLength === index + 1 ||
          sortedAnswers[index] !== sortedAnswers[index + 1])
      ) {
        assessmentAnswers.push({
          questionId: question.id,
          question: question.question,
          answers: answersByQuestion,
        });
        answersByQuestion = [];
      }
    }

    const answeredAssessment: IAnsweredAssessment = {
      assessmentId: assessment.id,
      assessmentAnswers: assessmentAnswers,
    };

    return answeredAssessment;
  } catch (error) {
    throw error;
  }
}

export { createAnswers, findAnswersByAssessment };
