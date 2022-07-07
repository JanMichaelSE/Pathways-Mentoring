import styles from "./login.module.css";
import Pathway_Logo from "@/assets/Pathway_Logo.png";
import { Link } from "react-router-dom";
import LoginForm from "../../../components/Auth/LoginForm/login-form";

function Login() {
  return (
    <>
      <div className={styles.loginBackground}>
        <div className={styles.logoContainer}>
          <img className={styles.pathwayLogo} src={Pathway_Logo} alt="Logo" />
        </div>
        <div className={styles.formContainer}>
          <LoginForm />
        </div>
        <div className={styles.linkContainer}>
          <h2 className={styles.subHeading}>
            New to Pathways?{" "}
            <Link to={"/signup"} className={styles.navigationLink}>
              Create an account.
            </Link>
            <br />
          </h2>
          <h2 className={styles.subHeading}>
            <Link to={"/"} className={styles.navigationLink}>
              Forgot password?
            </Link>
            <br />
          </h2>
        </div>
      </div>
    </>
  );
}

export default Login;
