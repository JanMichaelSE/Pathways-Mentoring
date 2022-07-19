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

async function httpGetStudentbyID(userID) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };
  try {
    const response = await axios.get("/students/" + userID);

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

async function httpUpdateStudent(student) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const name = `${student.firstName} ${student.lastName}`;

    const studentInfo = {
      userId: student.userId,
      name: name,
      email: student.email,
      phone: student.phone,
      gender: student.gender,
      currentPassword: student.currentPassword,
      newPassword: student.newPassword,
      fieldOfStudy: student.fieldOfStudy,
      institution: student.institution,
      gpa: Number(student.gpa),
    };

    const response = await axios.post("/students", studentInfo);

    userToReturn.data = response.data;
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
async function httpGetMentorbyID(userID) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };
  try {
    const response = await axios.get("/mentors/" + userID);

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

export {
  httpLogin,
  httpSignupStudent,
  httpSignupMentor,
  httpGetStudentbyID,
  httpUpdateStudent,
  httpGetMentorbyID,
};
