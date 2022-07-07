import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import Button from "@/components/common/Button/button";
import Input from "@/components/Auth/InputLogin/input-login";
import styles from "./login-form.module.css";

import { httpLogin } from "@/api/user.api";
import { useUserStore } from "@/store/user.store";

function LoginForm() {
  const navigate = useNavigate();
  const role = useUserStore((state) => state.role);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (role == "Student") {
      navigate("../student", { replace: true });
    } else if (role == "Mentor") {
      navigate("../mentor", { replace: true });
    } else if (role == "Admin") {
      navigate("../admin", { replace: true });
    }
  }, [role]);

  async function handleSubmit(studentInfo) {
    const userResponse = await httpLogin(studentInfo);

    if (userResponse.hasError) {
      return toast.error(userResponse.errorMessage);
    }

    setUser(
      userResponse.data.userId,
      userResponse.data.email,
      userResponse.data.role
    );
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .min(12, "Must Contain 12 Characters")
          .required("Password is required"),
      })}
      onSubmit={async (values) => {
        await handleSubmit(values);
      }}
    >
      <Form>
        <div className={styles.formInput}>
          <Input name="email" type="text" placeholder="Email" id="input" />
          <div className={styles.error}>
            <ErrorMessage name="email" />
          </div>

          <Input
            name="password"
            type="password"
            placeholder="Password"
            id="input"
          />
          <div className={styles.error}>
            <ErrorMessage name="password" />
          </div>

          <div className={styles.buttonContainer}>
            <Button type="submit">Log In</Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default LoginForm;
