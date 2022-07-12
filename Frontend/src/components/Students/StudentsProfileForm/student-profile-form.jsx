import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";

import { httpUpdateStudent } from "@/api/user.api";
import { useUserStore } from "@/store/user.store";

import Button from "@/components/common/Button/button";
import Input from "@/components/common/Input/input";
import Select from "@/components/common/Select/select";
import styles from "./student-profile-form.module.css";
import { Image } from "@chakra-ui/react";

function StudentProfileForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const userId = useUserStore((state) => state.userId);
  const setUser = useUserStore((state) => state.setUser);

  console.log("User Id from Component: ", userId);

  useEffect(() => {
    if (userId) {
      navigate("../student", { replace: true });
    }
  }, [userId]);

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

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          currentPassword: "",
          password: "",
          confirmPassword: "",
          gender: "",
          fieldOfStudy: "",
          institution: "",
          gpa: "",
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
          fieldOfStudy: Yup.string().required("Field of Study is required"),
          institution: Yup.string().required("Insitution is required"),
          gpa: Yup.number(),
        })}
        onSubmit={async (values) => {
          console.log("User Id: ", userId);
          await handleSubmit(values);
        }}
      >
        <Form className={styles.formContainer}>
          <div className={styles.photoContainer}>
            <h1 className={styles.profileHeader}>My Profile</h1>
            <Button type="submit" id="editbutton" style={{ width: 130 }}>
              Edit
            </Button>
          </div>
          <div className={styles.avatarContainer}>
            <Image
              borderRadius="full"
              boxSize="200px"
              src="/assets/Profile-avatar.svg"
              alt="Avatar"
            />
            <Button
              type="submit"
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
            >
              <Image
                borderRadius="full"
                boxSize="62px"
                src="/assets/Profile-Avatar-Icon.svg"
                alt="Avatar"
                m="auto"
              />
            </Button>
            <Button
              type="submit"
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
            <Input label="First Name" name="firstName" type="text" width={414}/>
            <Input label="Last Name" name="lastName" type="text" width={414}/>
            <Input label="Email" name="email" type="text" width={414}/>
            <Input label="Phone" name="phone" type="tel" width={414}/>
            <Select label="Gender" name="gender" style={{ width: 250 }}>
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
            />
            <Input label="Password" name="password" type="password" width={350}/>
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              width={350}
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
            <Input label="Field Of Study" name="fieldOfStudy" type="text" width={350}/>
            <Input label="Institution" name="institution" type="institution" width={350}/>
            <Input label="GPA" name="gpa" type="numeric" width={350} />
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
