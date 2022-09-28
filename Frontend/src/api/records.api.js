import axios from "@/utils/axios";

async function httpGetRecordByUser() {
  let recordsToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.get("/records/user");
    recordsToReturn.data = response.data;
  } catch (error) {
    console.log("Error for Records By User:", error);
    const errorResponse = error.response.data;
    recordsToReturn.hasError = true;
    recordsToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return recordsToReturn;
}

export { httpGetRecordByUser };
