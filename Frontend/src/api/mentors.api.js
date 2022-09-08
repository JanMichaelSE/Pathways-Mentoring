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

  export default httpGetAllMentors;