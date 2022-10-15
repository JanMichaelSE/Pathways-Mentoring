import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { useUserStore } from "@/store/user.store";

import Button from "@/components/common/Button/button";
import Input from "@/components/common/Input/input";
import lockIcon from "@/assets/secure-icon.svg";

import { httpResetPassword } from "@/api/user.api";

import styles from "./reset-password-form.module.css";

function ResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const setTokens = useUserStore((state) => state.setTokens);

  const toast = useToast();
  const [isLessThan1135] = useMediaQuery("(max-width: 1135px)");

  useEffect(() => {
    const accessToken = searchParams.get("token");
    setTokens(accessToken, "");
  }, []);

  async function handleResetPasswordSubmit(studentInfo) {
    const userResponse = await httpResetPassword(studentInfo.password);

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    toast({
      description: "Password has been reset! You may now login.",
      status: "success",
      position: "top",
      duration: 5000,
    });

    navigate("../", { replace: true });
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
        await handleResetPasswordSubmit(values);
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
              height={"70px"}
            />
          </div>

          <div className={styles.inputContainer}>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              imgUrl={lockIcon}
              width={inputWidth()}
              height={"70px"}
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
