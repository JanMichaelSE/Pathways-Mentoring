import axios from "@/utils/axios";

async function httpGetAllAssessments() {
  let assessmentsToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.get("/assessments");
    assessmentsToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    assessmentToReturn.hasError = true;
    assessmentToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return assessmentsToReturn;
}

async function httpGetAssessment(assessmentId) {
  let assessmentToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.get("/assessments/" + assessmentId);
    assessmentToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    assessmentToReturn.hasError = true;
    assessmentToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return assessmentToReturn;
}

async function httpAddAssessment(assessment) {}

async function httpUpdateAssessment(assessment) {}

async function httpDeleteAssessment(assessment) {}

async function httpAnswerAssessment(answers, assessmentId) {
  let answerResponse = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.post("/assessments/answer/" + assessmentId, {
      answers,
    });
    answerResponse.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    answerResponse.hasError = true;
    answerResponse.errorMessage = errorResponse.error.errorMessage;
  }

  return answerResponse;
}

async function httpGetAnswersByAssessment() {}

export { httpGetAllAssessments, httpGetAssessment, httpAnswerAssessment };
