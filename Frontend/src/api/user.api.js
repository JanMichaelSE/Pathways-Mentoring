import axios from "axios";

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

    const response = await axios.post(
      "http://localhost:5000/auth/login",
      userInfo
    );

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

    const response = await axios.post(
      "http://localhost:5000/auth/signup/mentor",
      mentorInfo
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

export { httpLogin, httpSignupStudent, httpSignupMentor };
