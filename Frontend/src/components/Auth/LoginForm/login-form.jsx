import { useState, useEffect } from "react";
import { Formik, Form,ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@/components/common/Button/button";
import Input from "@/components/Auth/LoginForm/common/input-login";
import styles from "./login-form.module.css";
import { useNavigate } from "react-router-dom";
import { httpLogin } from "@/api/user.api";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm(){
    const navigate = useNavigate();
    const [user, setUser] = useState(null);


  useEffect(() => {
    if (user) {
      if(user.role == "Student"){
        navigate("../student", { replace: true });
      }else if(user.role == "Mentor"){
        navigate("../mentor", { replace: true });
      }else if(user.role == "Admin"){
        navigate("../admin", { replace: true });
      }

    }
  }, [user]);

  async function handleSubmit(studentInfo) {
    const userResponse = await httpLogin(studentInfo);

    if (userResponse.hasError) {
      return toast.error(userResponse.errorMessage,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
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
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  />
                {/* Same as */}
                <ToastContainer />
            </div>
        </Form>
    </Formik>
    );
}

export default LoginForm;
