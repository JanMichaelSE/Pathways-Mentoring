import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

import Button from "@/components/common/Button/button";
import Input from "@/components/common/Input/input";

import lockIcon from "@/assets/secure-icon.svg";
import styles from "./reset-password-form.module.css";

import { httpLogin } from "@/api/user.api";
import { useUserStore } from "@/store/user.store";

function ResetPasswordForm() {
  const navigate = useNavigate();
  const role = useUserStore((state) => state.role);
  const setUser = useUserStore((state) => state.setUser);
  const setTokens = useUserStore((state) => state.setTokens);

  const toast = useToast();
  const [isLessThan1135] = useMediaQuery("(max-width: 1135px)");

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
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    setUser(userResponse.data.email, userResponse.data.role);
    setTokens(userResponse.data.accessToken, userResponse.data.refreshToken);
  }

  function inputWidth() {
    return isLessThan1135 ? "22rem" : "30rem";
  }

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        password: Yup.string().min(
          12,
          "Password must be at least 12 characters"
        ),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Passwords must match"
        ),
      })}
      onSubmit={async (values) => {
        await handleSubmit(values);
      }}
    >
      <Form>
        <div className={styles.formInput}>
          <div className={styles.inputContainer}>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              imgUrl={lockIcon}
              width={inputWidth()}
            />
          </div>

          <div className={styles.inputContainer}>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              imgUrl={lockIcon}
              width={inputWidth()}
            />
          </div>

          <div className={styles.buttonContainer}>
            <Button style={{ width: "20rem" }} type="submit">
              Reset Password
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default ResetPasswordForm;
