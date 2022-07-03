import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@/components/common/Button/button";
import Input from "@/components/common/Input/input";
import Select from "@/components/common/Select/select";
import styles from "./student-form.module.css";
import { useNavigate } from "react-router-dom";
import { httpSignupStudent } from "@/api/user.api";
import { toast } from "react-toastify";

function StudentForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      navigate("../student", { replace: true });
    }
  }, [user]);

  async function handleSubmit(studentInfo) {
    const userResponse = await httpSignupStudent(studentInfo);

    if (userResponse.hasError) {
      return toast.error(userResponse.errorMessage);
    }

    setUser(userResponse.data);
  }

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          secondLastName: "",
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
          firstName: Yup.string().required(),
          lastName: Yup.string().required(),
          secondLastName: Yup.string().required(),
          phone: Yup.string().matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Phone number is not valid"
          ),
          email: Yup.string().email("Invalid email address").required(),
          password: Yup.string()
            .min(12)
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            )
            .required(),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required(),
          gender: Yup.string().oneOf(["Male", "Female", "Other"]).required(),
          fieldOfStudy: Yup.string().required(),
          institution: Yup.string().required(),
          gpa: Yup.number().required(),
        })}
        onSubmit={async (values) => {
          await handleSubmit(values);
        }}
      >
        <Form className={styles.formContainer}>
          <div className={styles.formInput}>
            <Input label="First Name *" name="firstName" type="text" />
            <Input label="Last Name *" name="lastName" type="text" />
            <Input
              label="Second Last Name *"
              name="secondLastName"
              type="text"
            />
            <Input label="Phone" name="phone" type="text" />
            <Input label="Email *" name="email" type="text" />
            <Input label="Password *" name="password" type="text" />
            <Input
              label="Confirm Password *"
              name="confirmPassword"
              type="text"
            />
            <Input label="Field Of Study *" name="fieldOfStudy" type="text" />
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
            <Input label="GPA *" name="gpa" type="numeric" width={120} />
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
