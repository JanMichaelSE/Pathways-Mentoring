import axios from "@/utils/axios";

//This is still a test

async function httpGetAssessment(assessmentId) {
  let assessmentToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.get("/student/assessments/" + assessmentId);

    console.log(response.data);

    assessmentToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;

    //console.log(errorResponse);

    if (errorResponse.error.errorCode == 400) {
      assessmentToReturn.hasError = true;
      assessmentToReturn.errorMessage = errorResponse.error.errorMessage;
    } else if (errorResponse.error.errorCode == 500) {
      assessmentToReturn.hasError = true;
      assessmentToReturn.errorMessage = errorResponse.error.errorMessage;
    }
  }
  return assessmentToReturn;
}

async function httpGetAllAssessments() {}

async function httpAddAssessment(assessment) {}

async function httpUpdateAssessment(assessment) {}

async function httpDeleteAssessment(assessment) {}

async function httpAnswerAssessment() {}

async function httpGetAnswersByAssessment() {}

export { httpGetAssessment };
