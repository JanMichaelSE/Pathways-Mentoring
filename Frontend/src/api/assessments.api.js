import axios from "@/utils/axios";

async function httpGetAllAssessments() {
  let assessmentsToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.get("/assessments");
    console.log("Get All Asessments: ", response.data);
    assessmentsToReturn.data = response.data;
  } catch (error) {
    console.log("Get All Assessments Error: ", error);
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
    console.log("Get Assessment: ", response.data);
    assessmentToReturn.data = response.data;
  } catch (error) {
    console.log("Get Assessment Error: ", error);
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
  let aanswerResponse = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.post("/assessments/answer/" + assessmentId, {
      answers,
    });
    aanswerResponse.data = response.data;
  } catch (error) {
    console.log("Answer Assessment Error: ", error);
    const errorResponse = error.response.data;
    aanswerResponse.hasError = true;
    aanswerResponse.errorMessage = errorResponse.error.errorMessage;
  }

  return aanswerResponse;
}

async function httpGetAnswersByAssessment() {}

export { httpGetAllAssessments, httpGetAssessment, httpAnswerAssessment };
