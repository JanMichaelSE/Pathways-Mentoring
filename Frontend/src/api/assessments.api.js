import axios from "@/utils/axios";

// --- Deprecated for MVP ---
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

// --- Deprecated for MVP ---
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

async function httpGetPathwaysAssessment() {
  let assessmentToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.get("/assessments/pathways");
    assessmentToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    assessmentToReturn.hasError = true;
    assessmentToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return assessmentToReturn;
}

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

export {
  httpGetAllAssessments,
  httpGetAssessment,
  httpAnswerAssessment,
  httpGetPathwaysAssessment,
};
