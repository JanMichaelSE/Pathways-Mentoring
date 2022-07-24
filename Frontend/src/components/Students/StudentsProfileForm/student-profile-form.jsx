import { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";

import { httpUpdateStudent, httpGetStudentbyID } from "@/api/user.api";
import { useUserStore } from "@/store/user.store";

import Button from "@/components/common/Button/button";
import Input from "@/components/common/Input/input";
import Select from "@/components/common/Select/select";
import styles from "./student-profile-form.module.css";
import { Image } from "@chakra-ui/react";

import {
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";

function StudentProfileForm() {
  const toast = useToast();
  const userId = useUserStore((state) => state.userId);
  const setUser = useUserStore((state) => state.setUser);
  const [userData, setUserData] = useState({});
  const [edit, setEdit] = useState(true);
  const [close, setClose] = useState("Edit");
  const [pictureData, setpictureData] = useState("");

  const arrayImgs = [...Array(53).keys()].splice(1, 52);

  useEffect(() => {
    async function loadStudentProfileInfo() {
      const studentInfo = await httpGetStudentbyID(userId);
      setUserData(studentInfo.data);
      console.log(studentInfo);
      console.log(!"");
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
  function clickImage(event) {
    console.log(event.target.id);
    setpictureData(event.target.id);
  }

  async function handleSubmit(studentInfo) {
    console.log(typeof studentInfo);
    const studentInfoWithID = {
      userId: userId,
      ...studentInfo,
      profilePicture: pictureData,
    };
    console.log(studentInfoWithID);
    const userResponse = await httpUpdateStudent(studentInfoWithID);
    console.log(userResponse);
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

  function ProfilePicture() {
    if (!userData.profilePicture) {
      return (
        <Image
          borderRadius="full"
          boxSize="200px"
          src="/assets/Profile-avatar.svg"
        ></Image>
      );
    } else {
      return (
        <svg>
          <use
            href={"/assets/spriteAvatar.svg#" + userData.profilePicture}
          ></use>
        </svg>
      );
    }
  }
  const ImageList = (props) => {
    const images = props.images.map((image) => {
      return (
        <Box
          key={image}
          id={"avatar" + image}
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
          }}
        >
          <svg
            key={image}
            id={"avatar" + image}
            className={styles.icon}
            onClick={clickImage}
          >
            <use
              key={image}
              id={"avatar" + image}
              href={"/assets/spriteAvatar.svg#avatar" + image}
            ></use>
          </svg>
        </Box>
      );
    });

    return (
      <div className={styles.avatarContainerModal}>
        <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
          {images}
        </SimpleGrid>
      </div>
    );
  };

  function PopOver() {
    const { onOpen, onClose, isOpen } = useDisclosure();

    return (
      <>
        <Popover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          closeOnBlur={true}
          placement="right"
        >
          <div style={{ position: "relative" }}>
            <PopoverTrigger>
              <button
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
              </button>
            </PopoverTrigger>
            <PopoverContent
              p={5}
              overscroll
              backgroundColor={"var(--color-white)"}
              w={400}
              h={180}
              alignItems="center"
            >
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody
                maxHeight={300}
                overflowY={"scroll"}
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "16px",
                    borderRadius: "20px",
                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: `#0066CC`,
                    borderRadius: "20px",
                    height: "50px",
                  },
                }}
              >
                <ImageList images={arrayImgs} />
              </PopoverBody>
            </PopoverContent>
          </div>
        </Popover>
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
          gender: Yup.string()
            .oneOf(["Male", "Female", "Other"])
            .required("Gender is required"),
          fieldOfStudy: Yup.string().required("Field of Study is required"),
          institution: Yup.string().required("Insitution is required"),
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
            <ProfilePicture></ProfilePicture>
            <PopOver name="profilePicture" />
            <button
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
            </button>
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
              src="/assets/academic-icon.svg"
              style={{ marginRight: "20px" }}
            ></img>
            Academic Information
          </h1>
          <div className={styles.formInput}>
            <Input
              label="Field Of Study"
              name="fieldOfStudy"
              type="text"
              width={350}
              disabled={edit}
            />
            <Input
              label="Institution"
              name="institution"
              type="institution"
              width={350}
              disabled={edit}
            />
            <Input
              label="GPA"
              name="gpa"
              type="numeric"
              width={350}
              disabled={edit}
            />
          </div>

          <div className={styles.buttonContainer}>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default StudentProfileForm;
