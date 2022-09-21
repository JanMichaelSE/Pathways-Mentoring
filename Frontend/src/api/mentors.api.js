import axios from "@/utils/axios";

async function httpGetAllMentors() {
  let mentorsToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.get("/mentors/");
    mentorsToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    mentorsToReturn.hasError = true;
    mentorsToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return mentorsToReturn;
}

async function httpGetUnapprovedMentors() {
  let mentorsToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.get("/mentors/unapproved");
    mentorsToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    mentorsToReturn.hasError = true;
    mentorsToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return mentorsToReturn;
}

async function httpApproveMentorAccess(userId) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const userInfo = {
      mentorId: userId,
    };
    console.log("UserInfo: ", userInfo);
    console.log("id:", userId);
    const response = await axios.post("/mentors/approve-mentor", userInfo);
    userToReturn.data = await response.data;
  } catch (error) {
    console.log(error);
    const errorResponse = error.response.data;
    if (typeof errorResponse.error.errorCode == "number") {
      userToReturn.hasError = true;
      userToReturn.errorMessage = errorResponse.error.errorMessage;
    }
  }

  return userToReturn;
}
export { httpGetAllMentors, httpGetUnapprovedMentors, httpApproveMentorAccess };
