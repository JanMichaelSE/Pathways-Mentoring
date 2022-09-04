import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";

import { httpSignupStudent } from "@/api/user.api";
import { useUserStore } from "@/store/user.store";

import Button from "@/components/common/Button/button";
import Input from "@/components/common/Input/input";
import Select from "@/components/common/Select/select";
import styles from "./student-form.module.css";

function StudentForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const setUser = useUserStore((state) => state.setUser);
  const setTokens = useUserStore((state) => state.setTokens);

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
    console.log("Role:", userResponse.data.role);
    setUser(userResponse.data.email, "Student");
    setTokens(userResponse.data.accessToken, userResponse.data.refreshToken);

    navigate("../student/assessments", { replace: true });
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
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(12, "Password must be at least 12 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Password Confirmation is required"),
          gender: Yup.string()
            .oneOf(["Male", "Female", "Other"])
            .required("Gender is required"),
          fieldOfStudy: Yup.string()
            .oneOf([
              "Architecture",
              "Business Administration",
              "Civil Engineering",
              "Computer Engineering",
              "Computer Science",
              "Electrical Engineering",
              "Environmental Engineering",
              "Industrial Engineering",
              "Mechanical Engineering",
            ])
            .required("Field of Study is required"),
          institution: Yup.string().required("Insitution is required"),
          gpa: Yup.number(),
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
            <Input
              label="Confirm Password *"
              name="confirmPassword"
              type="password"
            />
            <Select label="Field Of Study *" name="fieldOfStudy">
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
              label="Institution *"
              name="institution"
              type="institution"
            />
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
    </div>
  );
}

export default StudentForm;
