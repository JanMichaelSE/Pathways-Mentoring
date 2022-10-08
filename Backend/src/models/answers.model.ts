import { Assessment } from "./../../node_modules/.prisma/client/index.d";
import { prisma } from "../database";

import { Answer, Question } from "@prisma/client";

import { buildErrorObject, excludeFields } from "../utils/helpers";
import {
  IErrorResponse,
  IAnswer,
  IAnsweredAssessment,
  IAssessmentAnswers,
  IAnswerResposne,
  IAssessment,
  IQuestion,
} from "./../types/index.d";

async function upsertAnswers(
  answers: IAnswer[],
  userId: string
): Promise<Answer[] | IErrorResponse> {
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
      if (
        question.type === "Select" ||
        question.type === "Multi-select" ||
        question.type === "Rating"
      ) {
        const answer = answersMap.get(question.id);

        let isValidAnswer = true;
        const answers = answer?.answer.split(";") ?? [];
        for (const _answer of answers) {
          if (!question.options?.includes(_answer)) {
            isValidAnswer = false;
          }
        }

        if (!isValidAnswer) {
          return buildErrorObject(
            400,
            `Could not create answer for question id "${question.id}", question "${question.question}" because it has provided an answer that is not within the available options of the question. If the question is of type 'Select', 'Multi-Select' or 'Rating'. Please provide a valid answer that are within the available options of that question.`
          );
        }
      }
    }

    const existingAnswers = await prisma.answer.findMany({
      where: {
        userId: userId,
      },
    });
    const existingAnswersMap = new Map(
      existingAnswers.map((answer) => [answer.questionId, answer])
    );

    let updatedAnswers: Answer[] = [];
    for (const answer of answers) {
      const answerFromMap = existingAnswersMap.get(answer.questionId);
      const updatedAnswer = await prisma.answer.upsert({
        where: {
          id: answerFromMap?.id ?? -1,
        },
        create: {
          answer: answer.answer,
          questionId: answer.questionId,
          userId: answer.userId,
        },
        update: {
          answer: answer.answer,
          lastModified: new Date(),
        },
      });
      const filteredAnswer = excludeFields(updatedAnswer, "userId");
      updatedAnswers.push(filteredAnswer);
    }

    return updatedAnswers;
  } catch (error) {
    throw error;
  }
}

async function findAssessmentAnswersByUserId(
  assessment: Assessment,
  questions: Question[],
  userId: string
): Promise<IAssessment> {
  try {
    const questionIds = questions.map((question) => question.id);
    const answers = await prisma.answer.findMany({
      where: {
        AND: {
          questionId: { in: questionIds },
          userId: userId,
        },
      },
    });

    let questionsWithAnswers: IQuestion[] = [];
    const answersMap = new Map(answers.map((answer) => [answer.questionId, answer]));
    for (const question of questions) {
      const answer = answersMap.get(question.id);

      const questionWithAnswer: IQuestion = {
        id: question.id,
        question: question.question,
        type: question.type,
        options: question.options ?? undefined,
        answer: answer?.answer,
        answerId: answer?.id,
      };
      questionsWithAnswers.push(questionWithAnswer);
    }

    const assessmentToReturn: IAssessment = {
      id: assessment.id,
      name: assessment.name,
      description: assessment.description ?? undefined,
      questions: questionsWithAnswers,
    };

    return assessmentToReturn;
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
      return buildErrorObject(400, "An assessment with this Id does not exist in the system.");
    }

    const questions = await prisma.question.findMany({
      where: {
        assessmentId: assessment.id,
      },
    });
    const questionsMap = new Map(questions.map((question) => [question.id, question]));

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
      const answer = excludeFields(sortedAnswers[index], "userId", "id", "questionId");
      answersByQuestion.push(answer);

      if (
        question &&
        (sortedAnswersLength === index + 1 || sortedAnswers[index] !== sortedAnswers[index + 1])
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

export { upsertAnswers, findAnswersByAssessment, findAssessmentAnswersByUserId };
