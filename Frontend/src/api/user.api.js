import axios from "axios";

async function httpLogin(userParam) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const userInfo = {
      email: userParam.email,
      password: userParam.password,
    };

    const response = await axios.post(
      "http://localhost:5000/auth/login",
      userInfo
    );

    userToReturn.data = response.data;
    console.log(userToReturn);
  } catch (error) {
    const errorResponse = error.response.data;
    if (errorResponse.error.errorCode == 401) {
      userToReturn.hasError = true;
      userToReturn.errorMessage = errorResponse.error.errorMessage;
    } else if (errorResponse.error.errorCode == 500) {
      userToReturn.hasError = true;
      userToReturn.errorMessage = errorResponse.error.errorMessage;
    }
  }

  return userToReturn;
}

async function httpSignupStudent(studentParam) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const name = `${studentParam.firstName} ${studentParam.lastName}`;

    const studentInfo = {
      name: name,
      password: studentParam.password,
      email: studentParam.email,
      role: "student",
      phone: studentParam.phone,
      gender: studentParam.gender,
      gpa: Number(studentParam.gpa),
      institution: studentParam.institution,
      fieldOfStudy: studentParam.fieldOfStudy,
    };

    const response = await axios.post(
      "http://localhost:5000/auth/signup/student",
      studentInfo
    );

    userToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    if (errorResponse.error.errorCode == 400) {
      userToReturn.hasError = true;
      userToReturn.errorMessage = errorResponse.error.errorMessage;
    } else if (errorResponse.error.errorCode == 500) {
      userToReturn.hasError = true;
      userToReturn.errorMessage = errorResponse.error.errorMessage;
    }
  }

  return userToReturn;
}

export { httpSignupStudent, httpLogin };
