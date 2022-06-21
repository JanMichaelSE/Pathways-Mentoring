import { IAssessment } from "./../../types/index.d";
import { Request, Response } from "express";
import { createAssessment, deleteAssessment } from "../../models/assessments.model";
import { IErrorResponse } from "../../types";
import { handleErrorResponse, titleCase } from "../../utils/helpers";

async function httpGetAllAssessments(req: Request, res: Response) {}

async function httpGetAssessment(req: Request, res: Response) {}

async function httpAddAssessment(req: Request, res: Response) {
  try {

    const assessmentInfo: IAssessment = {
      name: titleCase(req.body.name),
      description: req.body.description,
      questions: req.body.questions,
    };

    // Validate Assessments Required Fields
    if (!assessmentInfo.name || !assessmentInfo.questions?.length) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "Assessment name and questions are required for creation.",
      };
      return res.status(error.errorCode).json({ error });
    }

    // Validate Each Question for Required Fields
    for (const question of assessmentInfo.questions) {
      if (!question.question || !question.type) {
        const error: IErrorResponse = {
          errorCode: 400,
          errorMessage: `The question "${question.question}" is missing required fields question and type for creation.`,
        };
        return res.status(error.errorCode).json({ error });
      }
    }
    
    const assessmentResponse = await createAssessment(
      assessmentInfo.name,
      assessmentInfo.description,
      assessmentInfo.questions
    );

    if ('errorCode' in assessmentResponse) {
      return res.status(assessmentResponse.errorCode).json({
        error: assessmentResponse
      });
    }

    return res.status(200).json(assessmentResponse);

  } catch (error) {
    return handleErrorResponse("assessment creation", error, res);
  }
}

async function httpUpdateAssessment(req: Request, res: Response) {}

async function httpDeleteAssessment(req: Request, res: Response) {
  try {

    const assessmentId = req.params.id;
    if (Number.isNaN(assessmentId)) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "Assessment Id parameter must be of type number.",
      };
      return res.status(error.errorCode).json({ error });
    }

    const assessmentResponse = await deleteAssessment(Number(assessmentId));
    if ('errorCode' in assessmentResponse) {
      return res.status(assessmentResponse.errorCode).json({
        error: assessmentResponse
      });
    }

    return res.status(200).json(assessmentResponse);
    
  } catch (error) {
    return handleErrorResponse("assessment deletion", error, res);
  }
}

export {
  httpAddAssessment,
  httpGetAllAssessments,
  httpGetAssessment,
  httpUpdateAssessment,
  httpDeleteAssessment,
};
