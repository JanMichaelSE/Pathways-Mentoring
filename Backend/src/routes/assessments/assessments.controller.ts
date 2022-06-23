import { Request, Response } from "express";
import { createAssessment, deleteAssessment, getAllAssessments, getAssessmentWithQuestionsById, updateAssessment } from "../../models/assessments.model";
import { IErrorResponse, IAssessment } from "../../types";
import { handleErrorResponse, titleCase } from "../../utils/helpers";

async function httpGetAllAssessments(req: Request, res: Response) {
  try {

    const assessmentsResponse = await getAllAssessments();
    return res.status(200).json(assessmentsResponse);

  } catch (error) {
    return handleErrorResponse('get all assessments', error, res);
  }
}

async function httpGetAssessment(req: Request, res: Response) {
  try {
    
    const assessmentId = Number(req.params.id);    
    if (isNaN(assessmentId)) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "Assessment Id parameter must be of type number.",
      };
      return res.status(error.errorCode).json({ error });
    }

    const assessmentResponse = await getAssessmentWithQuestionsById(assessmentId);
    if (!assessmentResponse) {
      const error: IErrorResponse = {
        errorCode: 404,
        errorMessage: "An assessment with this Id doesn't exist.",
      };
      return res.status(error.errorCode).json({ error });
    }

    return res.status(200).json(assessmentResponse);

  } catch (error) {
    return handleErrorResponse('get assessment', error, res);
  }
}

async function httpAddAssessment(req: Request, res: Response) {
  try {

    const assessmentInfo: IAssessment = {
      name: titleCase(req.body.name),
      description: req.body.description,
      questions: req.body.questions,
    };

    const validAssessmentInfo = validateRequiredFields(assessmentInfo);
    if ('errorCode' in validAssessmentInfo) {
      return res.status(validAssessmentInfo.errorCode).json({error: validAssessmentInfo.errorMessage});
    }
    
    const assessmentResponse = await createAssessment(
      validAssessmentInfo.name,
      validAssessmentInfo.description,
      validAssessmentInfo.questions
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

async function httpUpdateAssessment(req: Request, res: Response) {
  try {
    
    const validAssessmentId = validateAssessmentId(req.params.id);
    const assessmentInfo: IAssessment = {
      name: titleCase(req.body.name),
      description: req.body.description,
      questions: req.body.questions,
    };

    if (typeof validAssessmentId !== 'number') {
      return res.status(validAssessmentId.errorCode).json({error: validAssessmentId.errorMessage});
    }
    
    const validAssessmentInfo = validateRequiredFields(assessmentInfo);
    if ('errorCode' in validAssessmentInfo) {
      return res.status(validAssessmentInfo.errorCode).json({error: validAssessmentInfo.errorMessage});
    } 

    const assessmentResponse = await updateAssessment(validAssessmentInfo, validAssessmentId);
    return res.status(200).json(assessmentResponse);

  } catch (error) {
    return handleErrorResponse('update assessment', error, res);
  }
}

async function httpDeleteAssessment(req: Request, res: Response) {
  try {

    const assessmentId = Number(req.params.id);
    if (isNaN(assessmentId)) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: "Assessment Id parameter must be of type number.",
      };
      return res.status(error.errorCode).json({ error });
    }

    const assessmentResponse = await deleteAssessment(assessmentId);
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


// --- Assessment Helper Functions ---
function validateRequiredFields(assessmentInfo: IAssessment) : IAssessment | IErrorResponse {

  // Validate Assessments Required Fields
  if (!assessmentInfo.name || !assessmentInfo.questions?.length) {
    const error: IErrorResponse = {
      errorCode: 400,
      errorMessage: "Assessment name and questions are required to update assessment.",
    };
    return error;
  }

  // Validate Each Question for Required Fields
  for (const question of assessmentInfo.questions) {
    if (!question.question || !question.type) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage: `The question "${question.question}" is missing required fields question and type to update question.`,
      };
      return error;
    }
  }

  return assessmentInfo;

}

function validateAssessmentId(id: string) : number | IErrorResponse {

  const assessmentId = Number(id);
  
  if (isNaN(assessmentId)) {
    const error: IErrorResponse = {
      errorCode: 400,
      errorMessage: "Assessment Id parameter must be of type number.",
    };
    return error;
  }

  return assessmentId;

}

export {
  httpAddAssessment,
  httpGetAllAssessments,
  httpGetAssessment,
  httpUpdateAssessment,
  httpDeleteAssessment,
};
