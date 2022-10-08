import axios from "../utils/axios";

async function httpGetNote(noteId) {
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.get(`/notes/${noteId}`);
    responseToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    if (typeof errorResponse.error.errorCode == "number") {
      responseToReturn.hasError = true;
      responseToReturn.errorMessage = errorResponse.error.errorMessage;
    }
  }

  return responseToReturn;
}

export { httpGetNote };
