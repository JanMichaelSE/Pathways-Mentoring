import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useToast, useDisclosure } from "@chakra-ui/react";

import { httpSignupMentor } from "@/api/user.api";

import MentorSignUpPopup from "../MentorSignUpPopup/mentor-signup-popup";
import Button from "@/components/common/Button/button";
import Input from "@/components/common/Input/input";
import Select from "@/components/common/Select/select";
import InputCreatable from "@/components/common/InputCreatable/input-creatable";

import styles from "./mentor-form.module.css";

function MentorForm() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  async function handleSubmit(mentorInfo) {
    const userResponse = await httpSignupMentor(mentorInfo);

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }
    onOpen();
  }

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
          gender: "",
          academicDegree: "",
          department: "",
          facultyStatus: "",
          areaOfInterest: "",
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
          password: Yup.string()
            .min(12, "Password must be at least 12 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Password Confirmation is required"),
          gender: Yup.string().oneOf(["Male", "Female", "Other"]).required("Gender is required"),
          academicDegree: Yup.string().required("Academic Degree is required"),
          department: Yup.string().required("Department is required"),
          areaOfInterest: Yup.string().required("Area of Interest is required"),
          facultyStatus: Yup.string()
            .oneOf(["Instructor", "Assistant", "Associate", "Professor"])
            .required("Faculty Status is required"),
        })}
        onSubmit={async (values) => {
          await handleSubmit(values);
        }}
      >
        <Form className={styles.formContainer}>
          <div className={styles.formInput}>
            <Input label="First Name *" name="firstName" type="text" />
            <Input label="Last Name *" name="lastName" type="text" />
            <Select label="Academic Degree *" name="academicDegree">
              <option value="">Select Option</option>
              <option value="Master">Master</option>
              <option value="Doctorate">Doctorate</option>
              <option value="Post Doctoral">Post Doctoral</option>
            </Select>
            <Input label="Phone *" name="phone" type="tel" />
            <Input label="Email *" name="email" type="text" />
            <Input label="Password *" name="password" type="password" />
            <Input label="Confirm Password *" name="confirmPassword" type="password" />
            <InputCreatable
              label="Department *"
              name="department"
              initOptions={departmentValues}
              width="16rem"
            />
            <Input label="Area of Interest *" name="areaOfInterest" type="text" />
            <Select label="Gender *" name="gender">
              <option value="">Select Option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
            <Select label="Faculty Status *" name="facultyStatus">
              <option value="">Select Option</option>
              <option value="Instructor">Instructor</option>
              <option value="Assistant">Assistant</option>
              <option value="Associate">Associate</option>
              <option value="Professor">Professor</option>
            </Select>
          </div>

          <div className={styles.buttonContainer}>
            <Button type="submit">Sign Up</Button>
          </div>
        </Form>
      </Formik>
      <MentorSignUpPopup isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default MentorForm;
