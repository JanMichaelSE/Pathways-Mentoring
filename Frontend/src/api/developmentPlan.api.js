import axios from "@/utils/axios";

async function httpGetDevelopmentPlanQuestion() {
  let developmentPlanToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.get("/development-plan");
    developmentPlanToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    developmentPlanToReturn.hasError = true;
    developmentPlanToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return developmentPlanToReturn;
}

async function httpAnswerDevelopmentPlan(answers, assessmentId) {
  let answerResponse = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.post(
      "/development-plan/answer" + assessmentId,
      {
        answers,
      }
    );
    answerResponse.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    answerResponse.hasError = true;
    answerResponse.errorMessage = errorResponse.error.errorMessage;
  }

  return answerResponse;
}
export { httpGetDevelopmentPlanQuestion, httpAnswerDevelopmentPlan };
