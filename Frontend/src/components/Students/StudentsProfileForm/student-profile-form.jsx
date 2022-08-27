import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";

import { httpUpdateStudent, httpGetStudentbyID } from "@/api/user.api";
import { useUserStore } from "@/store/user.store";

import Button from "@/components/common/Button/button";
import Input from "@/components/common/Input/input";
import Select from "@/components/common/Select/select";
import styles from "./student-profile-form.module.css";
import { Box, useMediaQuery } from "@chakra-ui/react";
import ProfileChangerPopOver from "@/components/common/ProfileChangerPopOver/profile-changer-popover";
import ProfilePicture from "@/components/common/ProfilePicture/profile-picture";

function StudentProfileForm() {
  const toast = useToast();
  const userId = useUserStore((state) => state.userId);
  const setUser = useUserStore((state) => state.setUser);
  const setPictureData = useUserStore((state) => state.setPictureData);
  const pictureData = useUserStore((state) => state.pictureData);
  const [userData, setUserData] = useState({});
  const [edit, setEdit] = useState(true);
  const [close, setClose] = useState("Edit");
  const [dataFirstName, setDataFirstName] = useState("");
  const [dataLastName, setDataLastName] = useState("");

  const [isLessThan1135] = useMediaQuery("(max-width: 1135px)");
  const [isLessThan1420] = useMediaQuery("(max-width: 1420px)");
  // using Zustand to update selected element, set on file of popover,  getter on file of profile picture
  // define a set on student profile form pass
  // think about submitting a picture, if condition found in profile-picture

  useEffect(() => {
    async function loadStudentProfileInfo() {
      const studentInfo = await httpGetStudentbyID(userId);
      setUserData(studentInfo.data);
      setPictureData(studentInfo.data.profilePicture);
      var [firstName, lastName] = studentInfo.data.name.split("; ");
      setDataFirstName(firstName);
      setDataLastName(lastName);
      if (studentInfo.hasError) {
        return toast({
          description: studentInfo.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }
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

  async function handleSubmit(studentInfo) {
    const studentInfoWithID = {
      userId: userId,
      ...studentInfo,
      profilePicture: pictureData,
    };
    const userResponse = await httpUpdateStudent(studentInfoWithID);
    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    // setUser(userResponse.data.email);
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
      return "14rem";
    } else if (isLessThan1420) {
      return "20rem";
    } else {
      return "26rem";
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

  return (
    <div className={styles.formContainer}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          firstName: dataFirstName || "",
          lastName: dataLastName || "",
          phone: userData.phone || "",
          email: userData.email || "",
          currentPassword: "",
          password: "",
          confirmPassword: "",
          gender: userData.gender || "Select Option",
          fieldOfStudy: userData.fieldOfStudy || "",
          institution: userData.institution || "",
          gpa: userData.gpa || "",
          profilePicture: userData.profilePicture || "",
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
          // .required("Password Confirmation is required"),
          gender: Yup.string().oneOf(["Male", "Female", "Other"]),
          fieldOfStudy: Yup.string().oneOf([
            "Architecture",
            "Business Administration",
            "Civil Engineering",
            "Computer Engineering",
            "Computer Science",
            "Electrical Engineering",
            "Environmental Engineering",
            "Industrial Engineering",
            "Mechanical Engineering",
          ]),
          institution: Yup.string(),
          gpa: Yup.number(),
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
              />
            </Box>
            <Box>
              <Input
                label="Last Name"
                name="lastName"
                type="text"
                width={inputWidth()}
                disabled={edit}
              />
            </Box>
            <Box>
              <Input
                label="Email"
                name="email"
                type="text"
                width={inputWidth()}
                disabled={edit}
              />
            </Box>
            <Box>
              <Input
                label="Phone"
                name="phone"
                type="tel"
                width={inputWidth()}
                disabled={edit}
              />
            </Box>
            <Box>
              <Select
                label="Gender"
                name="gender"
                style={{ width: inputWidth() }}
                disabled={edit}
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
            />
            <Input
              label="Password"
              name="password"
              type="password"
              width={inputWidth()}
              disabled={edit}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              width={inputWidth()}
              disabled={edit}
            />
          </div>
          <h1 className={styles.line} id={styles.academicInfo}>
            <img
              className={styles.lineImg}
              src="/assets/academic-icon.svg"
              style={{ marginRight: "20px" }}
            ></img>
            Academic Information
          </h1>
          <div className={styles.inputContainer}>
            <Select
              label="Field Of Study"
              name="fieldOfStudy"
              style={{ width: inputWidthField() }}
              disabled={edit}
            >
              <option value="">Select Option</option>
              <option value="Architecture">Architecture</option>
              <option value="Business Administration">
                Business Administration
              </option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
              <option value="Environmental Engineering">
                Environmental Engineering
              </option>
              <option value="Industrial Engineering">
                Industrial Engineering
              </option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
            </Select>
            <Input
              label="Institution"
              name="institution"
              type="institution"
              width={inputWidthAcademic()}
              disabled={edit}
            />
            <Input
              label="GPA"
              name="gpa"
              type="numeric"
              width={inputWidthAcademic()}
              disabled={edit}
            />
          </div>

          <div className={styles.buttonContainer}>
            {!edit ? <Button type="submit">Submit</Button> : null}
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default StudentProfileForm;
