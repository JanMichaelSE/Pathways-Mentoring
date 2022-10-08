import axios from "@/utils/axios";

async function httpUpdateAdminProfile(admin) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const adminInfo = {
      email: admin.email.toLowerCase(),
      currentPassword: admin.currentPassword,
      newPassword: admin.password,
    };

    const response = await axios.post("auth/admin/profile", adminInfo);

    userToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    if (typeof errorResponse.error.errorCode == "number") {
      userToReturn.hasError = true;
      userToReturn.errorMessage = errorResponse.error.errorMessage;
    }
  }

  return userToReturn;
}

export { httpUpdateAdminProfile };
