import axios from "@/utils/axios";

async function httpLogin(user) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const userInfo = {
      email: user.email,
      password: user.password,
    };

    const response = await axios.post("/auth/login", userInfo);

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

async function httpSignupStudent(student) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const name = `${student.firstName} ${student.lastName}`;

    const studentInfo = {
      name: name,
      password: student.password,
      email: student.email,
      role: "student",
      phone: student.phone,
      gender: student.gender,
      gpa: Number(student.gpa),
      institution: student.institution,
      fieldOfStudy: student.fieldOfStudy,
    };

    const response = await axios.post("/auth/signup/student", studentInfo);

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

async function httpSignupMentor(mentor) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const name = `${mentor.firstName} ${mentor.lastName}`;

    const mentorInfo = {
      name: name,
      password: mentor.password,
      email: mentor.email,
      role: "mentor",
      phone: mentor.phone,
      gender: mentor.gender,
      academicDegree: mentor.academicDegree,
      department: mentor.department,
      interests: mentor.interests,
      facultyStatus: mentor.facultyStatus,
    };

    const response = await axios.post("/auth/signup/mentor", mentorInfo);

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

async function httpRefreshTokens(refreshToken) {
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.post("/auth/token", { token: refreshToken });
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

async function httpSetRefreshTokenTimeout(accessToken, refreshToken) {
  const responseToReturn = {
    
  }
  try {
    const accessTokenExperationTime = getJWTExpireDate(accessToken);
    setTimeout(()=> {
      const response = await httpRefreshTokens(refreshToken);
      const data = response.data;

    }, accessTokenExperationTime);
  } catch (error) {
    throw error;    
  }
}

export { httpLogin, httpSignupStudent, httpSignupMentor, httpRefreshTokens };
