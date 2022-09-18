import { IAnswer } from "./../../types/index.d";
import { Request, Response } from "express";
import { findDevelopmentPlanQuestionsWithAnswers } from "../../models/questions.model";
import { handleBadRequestResponse, handleErrorResponse } from "../../utils/helpers";
import { upsertAnswers } from "../../models/answers.model";

async function httpGetDevelopmentPlan(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const questionsWithAnswers = await findDevelopmentPlanQuestionsWithAnswers(userId);
    return res.status(200).json(questionsWithAnswers);
  } catch (error) {
    return handleErrorResponse("get development plan", error, res);
  }
}

async function httpAnswerDevelopmentPlan(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const answers = req.body.answers;

    // --- Validation of Answers ---
    if (!answers || answers?.lenght === 0) {
      return handleBadRequestResponse(
        "The request body must include the 'answers' parameter and include atleast one answer.",
        res
      );
    }

    for (const answer of answers) {
      if (!answer.questionId || !answer.answer) {
        return handleBadRequestResponse(
          "Answers must contain 'questionId' and 'answer' inorder to answer the development plan.",
          res
        );
      }
    }

    // --- Transformation of Answers ---
    const answersToUpsert: IAnswer[] = [];
    for (const answer of answers) {
      const answerTransformed: IAnswer = {
        id: answer.answerId,
        userId: userId,
        questionId: answer.questionId,
        answer: answer.answer,
      };
      answersToUpsert.push(answerTransformed);
    }

    const upsertedAnswers = await upsertAnswers(answersToUpsert, userId);
    if ("errorCode" in upsertedAnswers) {
      return res.status(upsertedAnswers.errorCode).json({
        error: upsertedAnswers,
      });
    }

    return res.status(200).json(upsertedAnswers);
  } catch (error) {
    return handleErrorResponse("answer development plan", error, res);
  }
}

export { httpGetDevelopmentPlan, httpAnswerDevelopmentPlan };
