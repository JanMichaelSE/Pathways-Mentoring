import axios from "@/utils/axios";

async function httpGetAllStudents() {
  let studentsToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.get("/students/");
    studentsToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    studentsToReturn.hasError = true;
    studentsToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return studentsToReturn;
}

async function httpGetStudentByUserId() {
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

async function httpUpdateStudentProfile(student) {
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
      newPassword: student.password,
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

async function httpRequestMentorship(userEmail) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const userInfo = {
      toEmail: userEmail,
    };
    const response = await axios.post("/students/request-mentorship", userInfo);
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

async function httpCancelMentorship(studentId) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const userInfo = {
      studentId: studentId,
    };
    const response = await axios.post("/students/cancel-mentorship", userInfo);
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

export {
  httpGetAllStudents,
  httpGetStudentByUserId,
  httpUpdateStudentProfile,
  httpRequestMentorship,
  httpCancelMentorship,
};
