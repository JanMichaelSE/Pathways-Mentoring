import axios from "@/utils/axios";

async function httpLogin(user) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const userInfo = {
      email: user.email.toLowerCase(),
      password: user.password,
    };

    const response = await axios.post("/auth/login", userInfo);
    userToReturn.data = await response.data;
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
    const name = `${student.firstName}; ${student.lastName}`;

    const studentInfo = {
      name: name,
      password: student.password,
      email: student.email.toLowerCase(),
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
    const name = `${mentor.firstName}; ${mentor.lastName}`;

    const mentorInfo = {
      name: name,
      password: mentor.password,
      email: mentor.email.toLowerCase(),
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

async function httpLogout() {
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.post("/auth/logout");
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

async function httpForgotPassword(email) {
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.post("/auth/forgotPassword", { email });
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

async function httpResetPassword(password) {
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.post("/auth/resetPassword", { password });
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

async function httpSendContactForm(contactInfo) {
  let responseToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.post("/contact-us", contactInfo);
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

async function httpGetStudentbyID() {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };
  try {
    const response = await axios.get("/students/profile");

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

async function httpUpdateStudent(student) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const name = `${student.firstName}; ${student.lastName}`;

    const studentInfo = {
      userId: student.userId,
      name: name,
      email: student.email.toLowerCase(),
      phone: student.phone,
      gender: student.gender,
      currentPassword: student.currentPassword,
      newPassword: student.newPassword,
      fieldOfStudy: student.fieldOfStudy,
      institution: student.institution,
      gpa: Number(student.gpa),
      profilePicture: student.profilePicture,
    };

    const response = await axios.post("/students", studentInfo);

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
async function httpGetMentorbyID() {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };
  try {
    const response = await axios.get("/mentors/profile");

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

async function httpUpdateMentor(mentor) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const name = `${mentor.firstName}; ${mentor.lastName}`;

    const mentorInfo = {
      userId: mentor.userId,
      name: name,
      email: mentor.email.toLowerCase(),
      phone: mentor.phone,
      gender: mentor.gender,
      currentPassword: mentor.currentPassword,
      newPassword: mentor.newPassword,
      academicDegree: mentor.academicDegree,
      description: mentor.description,
      interests: mentor.interests,
      department: mentor.department,
      facultyStatus: mentor.facultyStatus,
      office: mentor.office,
      officeHours: mentor.officeHours,
      profilePicture: mentor.profilePicture,
    };

    const response = await axios.post("/mentors", mentorInfo);

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

export {
  httpLogin,
  httpSignupStudent,
  httpSignupMentor,
  httpLogout,
  httpForgotPassword,
  httpResetPassword,
  httpSendContactForm,
  httpGetStudentbyID,
  httpUpdateStudent,
  httpGetMentorbyID,
  httpUpdateMentor,
};
