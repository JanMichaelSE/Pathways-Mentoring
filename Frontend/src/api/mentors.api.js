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

async function httpGetStudentByMentor() {
  let usersToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.get("/mentors/students");
    usersToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    usersToReturn.hasError = true;
    usersToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return usersToReturn;
}

async function httpGetMentorByUserId() {
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

async function httpUpdateMentorProfile(mentor) {
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
      newPassword: mentor.password,
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

async function httpAcceptMentorship(studentId) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const userInfo = {
      studentId: studentId,
    };
    const response = await axios.post("/mentors/accept-mentorship", userInfo);
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

async function httpGetUnapprovedMentors() {
  let mentorsToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const response = await axios.get("/mentors/unapproved");
    mentorsToReturn.data = response.data;
  } catch (error) {
    const errorResponse = error.response.data;
    mentorsToReturn.hasError = true;
    mentorsToReturn.errorMessage = errorResponse.error.errorMessage;
  }

  return mentorsToReturn;
}

async function httpApproveMentorAccess(userId) {
  let userToReturn = {
    hasError: false,
    data: null,
    errorMessage: "",
  };

  try {
    const userInfo = {
      mentorId: userId,
    };
    console.log("UserInfo: ", userInfo);
    console.log("id:", userId);
    const response = await axios.post("/mentors/approve-mentor", userInfo);
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
  httpGetAllMentors,
  httpGetStudentByMentor,
  httpGetMentorByUserId,
  httpUpdateMentorProfile,
  httpAcceptMentorship,
  httpGetUnapprovedMentors,
  httpApproveMentorAccess,
};
