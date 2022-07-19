import { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";

import { httpUpdateStudent, httpGetMentorbyID } from "@/api/user.api";
import { useUserStore } from "@/store/user.store";

import Button from "@/components/common/Button/button";
import Input from "@/components/common/Input/input";
import Select from "@/components/common/Select/select";
import styles from "./mentor-profile-form.module.css";
import { Image } from "@chakra-ui/react";

import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function MentorProfileForm() {
  const toast = useToast();
  const userId = useUserStore((state) => state.userId);
  const setUser = useUserStore((state) => state.setUser);
  const [userData, setUserData] = useState({});
  const [edit, setEdit] = useState(true);
  const [close, setClose] = useState("Edit");

  useEffect(() => {
    async function loadStudentProfileInfo() {
      const mentorInfo = await httpGetMentorbyID(userId);
      setUserData(mentorInfo.data);

      if (mentorInfo.hasError) {
        return toast({
          description: mentorInfo.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }
    }
    loadStudentProfileInfo();
  }, []);

  function onEdit(event) {
    setEdit((prev) => !prev);
    if (edit == false) {
      setClose("Edit");
    } else if (edit == true) {
      setClose("X");
    }
  }

  async function handleSubmit(studentInfo) {
    const userResponse = await httpUpdateStudent(studentInfo);

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    setUser(
      userResponse.data.userId,
      userResponse.data.email,
      userResponse.data.role
    );
  }

  function ScrollingExample() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = useState("inside");

    const btnRef = useRef(null);
    return (
      <>
        <Button
          type="button"
          id="avatarbutton"
          style={{
            width: 58,
            height: 58,
            float: "none",
            background: "none",
            position: "relative",
            top: -75,
            right: -90,
          }}
          onClick={onOpen}
          disabled={edit}
        >
          <Image
            borderRadius="full"
            boxSize="62px"
            src="/assets/Profile-Avatar-Icon.svg"
            alt="Avatar"
            m="auto"
          />
        </Button>

        <Modal
          onClose={onClose}
          finalFocusRef={btnRef}
          isOpen={isOpen}
          scrollBehavior={"inside"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Hola soy Daniel</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <div className={styles.formContainer}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          firstName: "",
          lastName: "",
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
          firstName: Yup.string().required("First Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          phone: Yup.string()
            .matches(
              /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
              "Phone number is not valid"
            )
            .min(10, "Phone number must be 10 digits"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          currentPassword: Yup.string()
            .min(12, "Current password must be at least 12 characters")
            .required("Current password is required"),
          password: Yup.string()
            .min(12, "Password must be at least 12 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Password Confirmation is required"),
          gender: Yup.string()
            .oneOf(["Male", "Female", "Other"])
            .required("Gender is required"),
          academicDegree: Yup.string().required(),
          description: Yup.string().required("Description is required"),
          department: Yup.string().required("Department is required"),
          facultyStatus: Yup.string().required("Faculty Status is required"),
          office: Yup.string().required("Office is required"),
          officeHourst: Yup.string().required("Office Hours is required"),
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
            <Image
              borderRadius="full"
              boxSize="200px"
              src="/assets/avatarAssets/avatar01.svg"
              alt="Avatar"
            />
            <ScrollingExample />
            <Button
              type="button"
              id="camerabutton"
              style={{
                width: 58,
                height: 58,
                float: "none",
                background: "none",
                position: "relative",
                top: -100,
                right: -25,
              }}
              disabled={edit}
            >
              <Image
                borderRadius="full"
                boxSize="62px"
                src="/assets/Profile-Camera-Icon.svg"
                alt="Avatar"
                m="auto"
              />
            </Button>
          </div>

          <h1 className={styles.line}>
            <img
              className={styles.lineImg}
              src="/assets/more-info.svg"
              style={{ marginRight: "20px" }}
            ></img>
            Personal Information
          </h1>

          <div className={styles.formInput}>
            <Input
              label="First Name"
              name="firstName"
              type="text"
              width={414}
              disabled={edit}
            />
            <Input
              label="Last Name"
              name="lastName"
              type="text"
              width={414}
              disabled={edit}
            />
            <Input
              label="Email"
              name="email"
              type="text"
              width={414}
              disabled={edit}
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              width={414}
              disabled={edit}
            />
            <Select
              label="Gender"
              name="gender"
              style={{ width: 250 }}
              disabled={edit}
            >
              <option value="">Select Option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </div>
          <h1 className={styles.line}>
            <img
              className={styles.lineImg}
              src="/assets/password-icon.svg"
              style={{ marginRight: "20px" }}
            ></img>
            Change Password
          </h1>
          <div className={styles.formInput}>
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              width={350}
              disabled={edit}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              width={350}
              disabled={edit}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              width={350}
              disabled={edit}
            />
          </div>
          <h1 className={styles.line}>
            <img
              className={styles.lineImg}
              src="/assets/bibliography-icon.svg"
              style={{ marginRight: "20px" }}
            ></img>
            Bibliography
          </h1>
          <div className={styles.formInput}>
            <Input name="description" type="text" width={350} disabled={edit} />
            <div />
            <h1 className={styles.line}>
              <img
                className={styles.lineImg}
                src="/assets/faculty-icon.svg"
                style={{ marginRight: "20px" }}
              ></img>
              Faculty Information
            </h1>
            <div className={styles.formInput}>
              <Select
                label="Academic Degree"
                name="academicDegree"
                width={350}
                disabled={edit}
              >
                <option value="">Select Option</option>
              </Select>
              <Select
                label="Department"
                name="department"
                width={350}
                disabled={edit}
              >
                <option value="">Select Option</option>
              </Select>
              <Select
                label="Faculty Status"
                name="facultyStatus"
                width={350}
                disabled={edit}
              >
                <option value="">Select Option</option>
              </Select>
              <Input
                label="Office Number"
                name="office"
                type="numeric"
                width={350}
                disabled={edit}
              />
              <Input
                label="Area of Interest"
                name="interes"
                type="text"
                width={350}
                disabled={edit}
              />
            </div>
            <h1 className={styles.line}>
              <img
                className={styles.lineImg}
                src="/assets/hour-icon.svg"
                style={{ marginRight: "20px" }}
              ></img>
              Office Hours
            </h1>
            <div className={styles.formInput}></div>
          </div>

          <div className={styles.buttonContainer}>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default MentorProfileForm;
