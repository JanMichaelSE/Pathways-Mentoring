import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useToast, useDisclosure } from "@chakra-ui/react";

import { httpSignupStudent } from "@/api/user.api";
import { useUserStore } from "@/store/user.store";

import StudentSignUpPopup from "../StudentSignUpPopup/student-signup-popup";
import Button from "@/components/common/Button/button";
import Input from "@/components/common/Input/input";
import Select from "@/components/common/Select/select";
import InputCreatable from "@/components/common/InputCreatable/input-creatable";

import styles from "./student-form.module.css";

function StudentForm() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setUser = useUserStore((state) => state.setUser);
  const setTokens = useUserStore((state) => state.setTokens);

  const fieldOfStudyValues = [
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

  async function handleSubmit(studentInfo) {
    const userResponse = await httpSignupStudent(studentInfo);

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    setUser(userResponse.data.email, "Student");
    setTokens(userResponse.data.accessToken, userResponse.data.refreshToken);
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
          email: Yup.string().email("Invalid email address").required("Email is required"),
          password: Yup.string()
            .min(12, "Password must be at least 12 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Password Confirmation is required"),
          gender: Yup.string().oneOf(["Male", "Female", "Other"]).required("Gender is required"),
          fieldOfStudy: Yup.string().required("Field of Study is required"),
          institution: Yup.string().required("Institution is required"),
          gpa: Yup.number()
            .min(0.01, "GPA can not be less than 0.01")
            .max(4, "GPA can not be more than 4.00"),
        })}
        onSubmit={async (values) => {
          await handleSubmit(values);
        }}
      >
        <Form className={styles.formContainer}>
          <div className={styles.formInput}>
            <Input label="First Name *" name="firstName" type="text" />
            <Input label="Last Name *" name="lastName" type="text" />
            <Input label="Phone" name="phone" type="tel" />
            <Input label="Email *" name="email" type="text" />
            <Input label="Password *" name="password" type="password" />
            <Input label="Confirm Password *" name="confirmPassword" type="password" />
            <InputCreatable
              label="Field Of Study *"
              name="fieldOfStudy"
              initOptions={fieldOfStudyValues}
              width="16rem"
            />
            <Input label="Institution *" name="institution" type="institution" />
            <Select label="Gender *" name="gender">
              <option value="">Select Option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
            <Input label="GPA" name="gpa" type="numeric" width={120} />
          </div>

          <div className={styles.buttonContainer}>
            <Button type="submit">Sign Up</Button>
          </div>
        </Form>
      </Formik>
      <StudentSignUpPopup isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default StudentForm;
