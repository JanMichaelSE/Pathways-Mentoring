import { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Spinner, useToast } from "@chakra-ui/react";

import { httpUpdateMentor, httpGetMentorbyID } from "@/api/user.api";
import { useUserStore } from "@/store/user.store";

import Button from "@/components/common/Button/button";
import Input from "@/components/common/Input/input";
import InputMessage from "@/components/common/InputMessage/InputMessage";
import Select from "@/components/common/Select/select";
import styles from "./mentor-profile-form.module.css";
import ProfileChangerPopOver from "@/components/common/ProfileChangerPopOver/profile-changer-popover";
import ProfilePicture from "@/components/common/ProfilePicture/profile-picture";
import { Box, useMediaQuery } from "@chakra-ui/react";
import Schedule from "@/components/common/Schedule/schedule";

function MentorProfileForm() {
  const toast = useToast();
  const userId = useUserStore((state) => state.userId);
  const setEmail = useUserStore((state) => state.setEmail);
  const setPictureData = useUserStore((state) => state.setPictureData);
  const pictureData = useUserStore((state) => state.pictureData);
  const [userData, setUserData] = useState({});
  const [edit, setEdit] = useState(true);
  const [close, setClose] = useState("Edit");
  const [dataFirstName, setDataFirstName] = useState("");
  const [dataLastName, setDataLastName] = useState("");
  const [countNumber, setCountNumber] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [isLessThan1135] = useMediaQuery("(max-width: 1135px)");
  const [isLessThan1420] = useMediaQuery("(max-width: 1420px)");

  useEffect(() => {
    async function loadStudentProfileInfo() {
      const mentorInfo = await httpGetMentorbyID(userId);

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
      setCountNumber(mentorInfo.data.description.length);
      setDataFirstName(firstName);
      setDataLastName(lastName);
      setIsLoading(false);
    }
    loadStudentProfileInfo();
  }, []);

  function onEdit() {
    setEdit((prev) => !prev);
    if (edit == false) {
      setClose("Edit");
    } else if (edit == true) {
      setClose("X");
    }
  }

  async function handleSubmit(mentorInfo) {
    console.log(typeof mentorInfo);
    const mentorInfoWithID = {
      userId: userId,
      ...mentorInfo,
      profilePicture: pictureData,
    };
    console.log(mentorInfoWithID);
    const userResponse = await httpUpdateMentor(mentorInfo);

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    setEmail(userResponse.data.email);
    onEdit();
    return toast({
      title: "Update Success!",
      description: "The changes were made.",
      status: "success",
      position: "top",
      duration: 7000,
    });
  }

  function inputWidth() {
    if (isLessThan1135) {
      return "12rem";
    } else if (isLessThan1420) {
      return "20rem";
    } else {
      return "26rem";
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

  function inputWidthField() {
    if (isLessThan1135) {
      return "18rem";
    } else if (isLessThan1420) {
      return "20rem";
    } else {
      return "26rem";
    }
  }

  function inputWidthAcademic() {
    if (isLessThan1135) {
      return "10rem";
    } else if (isLessThan1420) {
      return "20rem";
    } else {
      return "26rem";
    }
  }
  // if aqui antes de que el loade mi form va hacer el spinner
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
          password: "",
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
          firstName: Yup.string(),
          lastName: Yup.string(),
          phone: Yup.string()
            .matches(
              /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
              "Phone number is not valid"
            )
            .min(10, "Phone number must be 10 digits"),
          email: Yup.string().email("Invalid email address"),
          currentPassword: Yup.string().min(
            12,
            "Current password must be at least 12 characters"
          ),
          password: Yup.string().min(
            12,
            "Password must be at least 12 characters"
          ),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
          ),
          gender: Yup.string().oneOf(["Male", "Female", "Other"]),
          academicDegree: Yup.string().required(),
          description: Yup.string().test(
            "len",
            "Max character limit of 1500 reached.",
            (val) => (val?.length || 0) < 1500
          ),
          department: Yup.string(),
          facultyStatus: Yup.string(),
          office: Yup.string(),
          officeHourst: Yup.string(),
        })}
        onSubmit={async (values) => {
          await handleSubmit(values);
        }}
      >
        <Form className={styles.formContainer}>
          <div className={styles.photoContainer}>
            <h1 className={styles.profileHeader}>My Profile</h1>
            <Button
              type="button"
              id="editbutton"
              style={{ width: 130 }}
              onClick={onEdit}
            >
              {close}
            </Button>
          </div>
          <div className={styles.avatarContainer}>
            <ProfilePicture enableReinitialize={true}></ProfilePicture>
            <ProfileChangerPopOver name="profilePicture" edit={edit} />
          </div>

          <h1 className={styles.line} id={styles.personalInfo}>
            <img
              className={styles.lineImg}
              src="/assets/more-info.svg"
              style={{ marginRight: "20px" }}
            ></img>
            Personal Information
          </h1>

          {/* <div className={styles.formInput}> */}
          <div className={styles.inputContainer}>
            <Box>
              <Input
                label="First Name"
                name="firstName"
                type="text"
                width={inputWidth()}
                disabled={edit}
                isBlue={true}
              />
            </Box>
            <Box>
              <Input
                label="Last Name"
                name="lastName"
                type="text"
                width={inputWidth()}
                disabled={edit}
                isBlue={true}
              />
            </Box>
            <Box>
              <Input
                label="Email"
                name="email"
                type="text"
                width={inputWidth()}
                disabled={edit}
                isBlue={true}
              />
            </Box>
            <Box>
              <Input
                label="Phone"
                name="phone"
                type="tel"
                width={inputWidth()}
                disabled={edit}
                isBlue={true}
              />
            </Box>
            <Box>
              <Select
                label="Gender"
                name="gender"
                style={{ width: inputWidth() }}
                disabled={edit}
                isBlue={true}
              >
                <option value="">Select Option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </Box>
          </div>
          {/* </div> */}
          <h1 className={styles.line} id={styles.changePassword}>
            <img
              className={styles.lineImg}
              src="/assets/password-icon.svg"
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
              isBlue={true}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              width={inputWidth()}
              disabled={edit}
              isBlue={true}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              width={inputWidth()}
              disabled={edit}
              isBlue={true}
            />
          </div>
          <h1 className={styles.line} id={styles.bibliography}>
            <img
              className={styles.lineImg}
              src="/assets/bibliography-icon.svg"
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
              isBlue={true}
              maxLength={1500}
            />
          </div>
          <h1 className={styles.line} id={styles.facultyInfo}>
            <img
              className={styles.lineImg}
              src="/assets/faculty-icon.svg"
              style={{ marginRight: "20px" }}
            ></img>
            Faculty Information
          </h1>
          <div className={styles.facultyContainer}>
            <Select
              label="Academic Degree"
              name="academicDegree"
              style={{ width: inputWidth() }}
              disabled={edit}
              isBlue={true}
            >
              <option value="">Select Option</option>
            </Select>
            <Select
              label="Department"
              name="department"
              style={{ width: inputWidth() }}
              disabled={edit}
              isBlue={true}
            >
              <option value="">Select Option</option>
            </Select>
            <Select
              label="Faculty Status"
              name="facultyStatus"
              style={{ width: inputWidth() }}
              disabled={edit}
              isBlue={true}
            >
              <option value="">Select Option</option>
            </Select>
            <Input
              label="Office Number"
              name="office"
              type="numeric"
              width={inputWidth()}
              disabled={edit}
              isBlue={true}
            />
            <Input
              label="Area of Interest"
              name="interests"
              type="text"
              width={inputWidth()}
              disabled={edit}
              isBlue={true}
            />
          </div>
          <h1 className={styles.line} id={styles.officeHours}>
            <img
              className={styles.lineImg}
              src="/assets/clock-icon.svg"
              style={{ marginRight: "20px" }}
            ></img>
            Office Hours
          </h1>
          <p className={styles.headerOfficeHours}>
            Configure the standard hours of operation for this location.
          </p>
          <Schedule name="officeHours" />
          <div className={styles.buttonContainer}>
            {!edit ? <Button type="submit">Submit</Button> : null}
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default MentorProfileForm;
