import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Spinner, useToast, Box, useMediaQuery } from "@chakra-ui/react";

import { httpUpdateMentorProfile, httpGetMentorByUserId } from "@/api/mentors.api";
import { useUserStore } from "@/store/user.store";

import Button from "@/components/common/Button/button";
import Input from "@/components/common/Input/input";
import InputMessage from "@/components/common/InputMessage/InputMessage";
import Select from "@/components/common/Select/select";
import ProfileChangerPopOver from "@/components/common/Profile/ProfileChangerPopOver/profile-changer-popover";
import ProfilePicture from "@/components/common/Profile/ProfilePicture/profile-picture";
import Schedule from "@/components/Mentors/TimeComponents/Schedule/schedule";
import InputCreatable from "@/components/common/InputCreatable/input-creatable";

import BibliographyIcon from "@/assets/bibliography-icon.svg";
import ClockIcon from "@/assets/clock-icon.svg";
import FacultyIcon from "@/assets/faculty-icon.svg";
import MoreInfoIcon from "@/assets/more-info.svg";
import PasswordIcon from "@/assets/password-icon.svg";

import styles from "./mentor-profile-form.module.css";

function MentorProfileForm() {
  const toast = useToast();
  const setEmail = useUserStore((state) => state.setEmail);
  const setPictureData = useUserStore((state) => state.setPictureData);
  const pictureData = useUserStore((state) => state.pictureData);
  const setIsSubmitting = useUserStore((state) => state.setIsSubmitting);
  const isSubmitting = useUserStore((state) => state.isSubmitting);
  const setScheduleStatus = useUserStore((state) => state.setScheduleStatus);
  const [userData, setUserData] = useState({});
  const [edit, setEdit] = useState(true);
  const [close, setClose] = useState("Edit");
  const [dataFirstName, setDataFirstName] = useState("");
  const [dataLastName, setDataLastName] = useState("");
  const [countNumber, setCountNumber] = useState(0);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [transformedSchedule, setTransformedSchedule] = useState("");
  const [mentorData, setMentorData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const scheduleStatus = {
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  };
  const departmentValues = [
    "Architecture",
    "Business Administration",
    "Civil Engineering",
    "Computer Engineering",
    "Computer Science",
    "Electrical Engineering",
    "Environmental Engineering",
    "Industrial Engineering",
    "Mechanical Engineering",
  ];

  const [isLessThan820] = useMediaQuery("(max-width: 820px)");
  const [isLessThan1135] = useMediaQuery("(max-width: 1135px)");
  const [isLessThan1420] = useMediaQuery("(max-width: 1420px)");

  useEffect(() => {
    async function loadMentorProfileInfo() {
      const mentorInfo = await httpGetMentorByUserId();

      if (mentorInfo.hasError) {
        return toast({
          description: mentorInfo.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }
      setUserData(mentorInfo.data);
      setPictureData(mentorInfo.data.profilePicture);
      var [firstName, lastName] = mentorInfo.data.name.split("; ");
      if (mentorInfo.data.description == null) {
        setCountNumber(0);
      } else {
        setCountNumber(mentorInfo.data.description.length);
      }
      setDataFirstName(firstName);
      setDataLastName(lastName);
      setIsLoading(false);
    }
    loadMentorProfileInfo();
  }, []);

  // Handles Form Submission
  useEffect(() => {
    async function submit(mentorInfo) {
      const userResponse = await httpUpdateMentorProfile(mentorInfo);

      if (userResponse.hasError) {
        setIsSubmitting(false);
        setIsReadyToSubmit(false);
        return toast({
          description: userResponse.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }
      setEmail(userResponse.data.email);
      onEdit();
      setIsSubmitting(false);
      setIsReadyToSubmit(false);
      setScheduleStatus(scheduleStatus);
      return toast({
        title: "Update Success!",
        description: "The changes were made.",
        status: "success",
        position: "top",
        duration: 7000,
      });
    }

    if (isReadyToSubmit && isSubmitting) {
      const mentorInfoWithID = {
        ...mentorData,
        profilePicture: pictureData,
        officeHours: transformedSchedule,
      };
      submit(mentorInfoWithID);
    }
  }, [isReadyToSubmit]);

  function onEdit() {
    setEdit((prev) => !prev);
    if (edit == false) {
      setClose("Edit");
    } else if (edit == true) {
      setClose("X");
    }
  }

  async function handleSubmit(mentorInfo) {
    setIsSubmitting(true);
    setMentorData(mentorInfo);
  }

  function onReadyToSubmit(isReady, schedule) {
    setTransformedSchedule(schedule);
    setIsReadyToSubmit(isReady);
  }

  function inputWidth() {
    if (isLessThan820) {
      return "20rem";
    } else {
      if (isLessThan1135) {
        return "17rem";
      } else if (isLessThan1420) {
        return "20rem";
      } else {
        return "26rem";
      }
    }
  }

  function inputMessageWidth() {
    if (isLessThan1135) {
      return "40rem";
    } else if (isLessThan1420) {
      return "60rem";
    } else {
      return "90rem";
    }
  }

  if (isLoading) {
    return (
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        position="absolute"
        top="30%"
        left="50%"
      />
    );
  }
  return (
    <div className={styles.formContainer}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          firstName: dataFirstName || "",
          lastName: dataLastName || "",
          email: userData.email || "",
          phone: userData.phone || "",
          gender: userData.gender || "Select Option",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          academicDegree: userData.academicDegree || "",
          description: userData.description || "",
          interests: userData.interests || "",
          department: userData.department || "",
          facultyStatus: userData.facultyStatus || "",
          office: userData.office || "",
          officeHours: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("First Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          phone: Yup.string()
            .matches(
              /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
              "Phone number is not valid"
            )
            .min(10, "Phone number must be 10 digits")
            .required("Phone is required"),
          email: Yup.string().email("Invalid email address").required("Email is required"),
          currentPassword: Yup.string().min(12, "Current password must be at least 12 characters"),
          newPassword: Yup.string().min(12, "Password must be at least 12 characters"),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref("newPassword"), null],
            "Passwords must match"
          ),
          gender: Yup.string().oneOf(["Male", "Female", "Other"]).required("Gender is required"),
          academicDegree: Yup.string().required("Academic Degree is required"),
          description: Yup.string().test(
            "len",
            "Max character limit of 1500 reached.",
            (val) => (val?.length || 0) < 1500
          ),
          department: Yup.string().required("Department is required"),
          interests: Yup.string().required("Area of Interest is required"),
          facultyStatus: Yup.string()
            .oneOf(["Instructor", "Assistant", "Associate", "Professor"])
            .required("Faculty Status is required"),
          office: Yup.string(),
          officeHours: Yup.string(),
        })}
        onSubmit={async (values) => {
          await handleSubmit(values);
        }}
      >
        <Form className={styles.formContainer}>
          <div className={styles.photoContainer}>
            <h1 className={styles.profileHeader}>My Profile</h1>
            <Button type="button" id="editbutton" style={{ width: 130 }} onClick={onEdit}>
              {close}
            </Button>
          </div>
          <div className={styles.avatarContainer}>
            <ProfilePicture enableReinitialize={true} forProfile></ProfilePicture>
            <ProfileChangerPopOver name="profilePicture" edit={edit} />
          </div>

          <h1 className={styles.line} id={styles.personalInfo}>
            <img
              className={styles.lineImg}
              src={MoreInfoIcon}
              style={{ marginRight: "20px" }}
            ></img>
            Personal Information
          </h1>
          <div className={styles.inputContainer}>
            <Box>
              <Input
                label="First Name *"
                name="firstName"
                type="text"
                width={inputWidth()}
                disabled={edit}
                isBlue
              />
            </Box>
            <Box>
              <Input
                label="Last Name *"
                name="lastName"
                type="text"
                width={inputWidth()}
                disabled={edit}
                isBlue
              />
            </Box>
            <Box>
              <Input
                label="Email *"
                name="email"
                type="text"
                width={inputWidth()}
                disabled={edit}
                isBlue
              />
            </Box>
            <Box>
              <Input
                label="Phone *"
                name="phone"
                type="tel"
                width={inputWidth()}
                disabled={edit}
                isBlue
              />
            </Box>
            <Box>
              <Select
                label="Gender *"
                name="gender"
                style={{ width: inputWidth() }}
                disabled={edit}
                isBlue
              >
                <option value="">Select Option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </Box>
          </div>
          <h1 className={styles.line} id={styles.changePassword}>
            <img
              className={styles.lineImg}
              src={PasswordIcon}
              alt="Password Icon"
              style={{ marginRight: "20px" }}
            ></img>
            Change Password
          </h1>
          <div className={styles.inputContainer}>
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              width={inputWidth()}
              disabled={edit}
              isBlue
            />
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              width={inputWidth()}
              disabled={edit}
              isBlue
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              width={inputWidth()}
              disabled={edit}
              isBlue
            />
          </div>
          <h1 className={styles.line} id={styles.bibliography}>
            <img
              className={styles.lineImg}
              src={BibliographyIcon}
              style={{ marginRight: "20px" }}
            ></img>
            Bibliography
          </h1>
          <div className={styles.bibliographyContainer}>
            <InputMessage
              name="description"
              placeholder="Here is a sample placeholder"
              width={inputMessageWidth()}
              bottomCount={true}
              countNumber={countNumber}
              disabled={edit}
              isBlue
              maxLength={1500}
            />
          </div>
          <h1 className={styles.line} id={styles.facultyInfo}>
            <img
              className={styles.lineImg}
              src={FacultyIcon}
              alt="Faculty Icon"
              style={{ marginRight: "20px" }}
            ></img>
            Faculty Information
          </h1>
          <div className={styles.facultyContainer}>
            <Select
              label="Academic Degree *"
              name="academicDegree"
              style={{ width: inputWidth() }}
              disabled={edit}
              isBlue
            >
              <option value="">Select Option</option>
              <option value="Master">Master</option>
              <option value="Doctorate">Doctorate</option>
              <option value="Post Doctoral">Post Doctoral</option>
            </Select>
            <InputCreatable
              label="Department *"
              name="department"
              width={inputWidth()}
              initOptions={departmentValues}
              isBlue={true}
              disabled={edit}
            />
            <Select
              label="Faculty Status *"
              name="facultyStatus"
              style={{ width: inputWidth() }}
              disabled={edit}
              isBlue
            >
              <option value="">Select Option</option>
              <option value="Instructor">Instructor</option>
              <option value="Assistant">Assistant</option>
              <option value="Associate">Associate</option>
              <option value="Professor">Professor</option>
            </Select>
            <Input
              label="Office Number"
              name="office"
              type="numeric"
              width={inputWidth()}
              disabled={edit}
              isBlue
            />
            <Input
              label="Area of Interest *"
              name="interests"
              type="text"
              width={inputWidth()}
              disabled={edit}
              isBlue
            />
          </div>
          <h1 className={styles.line} id={styles.officeHours}>
            <img
              className={styles.lineImg}
              src={ClockIcon}
              alt="Clock Icon"
              style={{ marginRight: "20px" }}
            ></img>
            Office Hours
          </h1>
          <p className={styles.headerOfficeHours}>
            Configure the standard hours of operation for this location.
          </p>
          <Schedule
            name="officeHours"
            scheduleValue={userData.officeHours}
            edit={edit}
            onReadyToSubmit={onReadyToSubmit}
          />
          <div className={styles.buttonContainer}>
            {!edit ? <Button type="submit">Submit</Button> : null}
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default MentorProfileForm;
