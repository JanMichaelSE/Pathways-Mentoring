import { IAssessment, IErrorResponse } from "../../types";

function validateAssessmentRequiredFields(
  assessmentInfo: IAssessment
): IAssessment | IErrorResponse {
  // Validate Assessments Required Fields
  if (!assessmentInfo.name || !assessmentInfo.questions?.length) {
    const error: IErrorResponse = {
      errorCode: 400,
      errorMessage:
        "Assessment name and questions are required to update assessment.",
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

export { validateAssessmentRequiredFields };
