import { Request, Response } from "express";

import { upsertAnswers, findAnswersByAssessment } from "../../models/answers.model";
import {
  createAssessment,
  deleteAssessment,
  findAllAssessments,
  findAssessmentWithQuestionsById,
  findPathwaysAssessmentDataByUserId,
  updateAssessment,
} from "../../models/assessments.model";

import { IAssessment, IAnswer } from "../../types";
import {
  handleBadRequestResponse,
  handleErrorResponse,
  handleNotFoundResponse,
  titleCase,
} from "../../utils/helpers";
import { validateAssessmentRequiredFields } from "./assessments.helpers";

async function httpGetAllAssessments(req: Request, res: Response) {
  try {
    const assessmentsResponse = await findAllAssessments();
    return res.status(200).json(assessmentsResponse);
  } catch (error) {
    return handleErrorResponse("get all assessments", error, res);
  }
}

async function httpGetAssessment(req: Request, res: Response) {
  try {
    const assessmentId = Number(req.params.assessmentId);
    if (isNaN(assessmentId)) {
      return handleBadRequestResponse("Assessment Id parameter must be of type number.", res);
    }

    const assessmentResponse = await findAssessmentWithQuestionsById(assessmentId);
    if (!assessmentResponse) {
      return handleNotFoundResponse("An assessment with this Id doesn't exist.", res);
    }

    return res.status(200).json(assessmentResponse);
  } catch (error) {
    return handleErrorResponse("get assessment", error, res);
  }
}

async function httpGetPathwaysAssessment(req: Request, res: Response) {
  try {
    const userId = req.userId;

    const assessment = await findPathwaysAssessmentDataByUserId(userId);
    if (!assessment) {
      return handleNotFoundResponse("The system did not find the pathways assessment.", res);
    }

    return res.status(200).json(assessment);
  } catch (error) {
    return handleErrorResponse("get pathways assessment", error, res);
  }
}

async function httpAddAssessment(req: Request, res: Response) {
  try {
    const assessmentInfo: IAssessment = {
      name: titleCase(req.body.name),
      description: req.body.description,
      questions: req.body.questions,
    };

    const validAssessmentInfo = validateAssessmentRequiredFields(assessmentInfo);
    if ("errorCode" in validAssessmentInfo) {
      return res
        .status(validAssessmentInfo.errorCode)
        .json({ error: validAssessmentInfo.errorMessage });
    }

    const assessmentResponse = await createAssessment(
      validAssessmentInfo.name,
      validAssessmentInfo.description,
      validAssessmentInfo.questions
    );

    if ("errorCode" in assessmentResponse) {
      return res.status(assessmentResponse.errorCode).json({
        error: assessmentResponse,
      });
    }

    return res.status(200).json(assessmentResponse);
  } catch (error) {
    return handleErrorResponse("assessment creation", error, res);
  }
}

async function httpUpdateAssessment(req: Request, res: Response) {
  try {
    const assessmentId = Number(req.params.assessmentId);
    if (isNaN(assessmentId)) {
      return handleBadRequestResponse("Assessment Id parameter must be of type number.", res);
    }

    const assessmentInfo: IAssessment = {
      name: titleCase(req.body.name),
      description: req.body.description,
      questions: req.body.questions,
    };
    const validAssessmentInfo = validateAssessmentRequiredFields(assessmentInfo);
    if ("errorCode" in validAssessmentInfo) {
      return res
        .status(validAssessmentInfo.errorCode)
        .json({ error: validAssessmentInfo.errorMessage });
    }

    const assessmentResponse = await updateAssessment(validAssessmentInfo, assessmentId);
    return res.status(200).json(assessmentResponse);
  } catch (error) {
    return handleErrorResponse("update assessment", error, res);
  }
}

async function httpDeleteAssessment(req: Request, res: Response) {
  try {
    const assessmentId = Number(req.params.assessmentId);
    if (isNaN(assessmentId)) {
      return handleBadRequestResponse("Assessment Id parameter must be of type number.", res);
    }

    const assessmentResponse = await deleteAssessment(assessmentId);
    if ("errorCode" in assessmentResponse) {
      return res.status(assessmentResponse.errorCode).json({
        error: assessmentResponse,
      });
    }

    return res.status(200).json(assessmentResponse);
  } catch (error) {
    return handleErrorResponse("assessment deletion", error, res);
  }
}

async function httpAnswerAssessment(req: Request, res: Response) {
  try {
    const assessmentId = Number(req.params.assessmentId);
    const answersInfo = {
      userId: req.userId,
      answers: req.body.answers,
    };

    if (!assessmentId || !answersInfo.userId || !answersInfo.answers?.length) {
      return handleBadRequestResponse(
        "Cannot create the answers if 'assessmentId', 'answers' and 'userId' are not provided.",
        res
      );
    }

    if (isNaN(assessmentId)) {
      return handleBadRequestResponse("Assessment Id parameter must be of type number.", res);
    }

    for (const answer of answersInfo.answers) {
      let questionId = Number(answer.questionId);
      if (isNaN(questionId)) {
        return handleBadRequestResponse(
          `Question Id for answer: "${answer.answer}" must be of type number.`,
          res
        );
      }
    }

    let answersToCreate: IAnswer[] = [];
    for (const answer of answersInfo.answers) {
      answersToCreate.push({
        id: answer.id,
        userId: answersInfo.userId,
        questionId: answer.questionId,
        answer: answer.answer,
      });
    }

    const answersResponse = await upsertAnswers(answersToCreate, answersInfo.userId);
    if ("errorCode" in answersResponse) {
      return res.status(answersResponse.errorCode).json({
        error: answersResponse,
      });
    }

    return res.status(200).json(answersResponse);
  } catch (error) {
    return handleErrorResponse("answering assessment", error, res);
  }
}

async function httpGetAnswersByAssessment(req: Request, res: Response) {
  try {
    const assessmentId = Number(req.params.assessmentId);
    if (isNaN(assessmentId)) {
      return handleBadRequestResponse("Assessment Id must be of type parameter.", res);
    }

    const answersResponse = await findAnswersByAssessment(assessmentId);
    if ("errorCode" in answersResponse) {
      return res.status(answersResponse.errorCode).json({
        error: answersResponse,
      });
    }

    return res.status(200).json(answersResponse);
  } catch (error) {
    return handleErrorResponse("getting answers by assessment", error, res);
  }
}

export {
  httpAddAssessment,
  httpGetAllAssessments,
  httpGetAssessment,
  httpGetPathwaysAssessment,
  httpUpdateAssessment,
  httpDeleteAssessment,
  httpAnswerAssessment,
  httpGetAnswersByAssessment,
};
