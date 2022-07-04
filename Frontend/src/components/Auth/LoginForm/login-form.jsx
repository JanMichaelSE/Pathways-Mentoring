import { useState, useEffect } from "react";
import { Formik, Form,ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@/components/common/Button/button";
import Input from "@/components/Auth/LoginForm/common/input-login";
import styles from "./login-form.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginForm(){
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      navigate("../student", { replace: true });
    }
  }, [user]);

  async function handleSubmit(studentInfo) {
    //const userResponse = await httpSignupStudent(studentInfo);

    if (userResponse.hasError) {
      return toast.error(userResponse.errorMessage);
    }

    setUser(userResponse.data);
  }

    return (
    <Formik
        initialValues={{
            email: "",
            password: "",
        }}
        validationSchema={Yup.object({
            email: Yup.string().email("Invalid email address").required(),
            password: Yup.string().min(12,"Must Contain 12 Characters").required(),
        })}
        onSubmit={async (values) => {
            await handleSubmit(values);
        }}
    >
        <Form >
            <div className={styles.formInput}>
              <div className={styles.error} >
                <ErrorMessage className="emailMessage" name='email' />
              </div>
                <Input name="email" type="text" placeholder="Email" id="input"/>
              <div className={styles.error} >
                <ErrorMessage className={styles.pwdMessage} name='password' />
              </div>
                <Input name="password" type="password" placeholder="Password" id="input" />
            </div>
            <div className={styles.buttonContainer}>
                <Button type="submit">Log In</Button>
            </div>
        </Form>
    </Formik>
    );
}

export default LoginForm;
