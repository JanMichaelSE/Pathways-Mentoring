import styles from "./login.module.css";
import Pathway_Logo from "@/assets/Pathway_Logo.png";
import LoginForm from "@/components/Auth/LoginForm/login-form";
import SignupPopupSelector from "@/components/Auth/SignupPopupSelector/signup-popup-selector";
import ForgotPwdLoginPopup from "@/components/Auth/ForgotPwdLoginPopup/forgotpwd-login-popup";

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
            New to Pathways? <SignupPopupSelector />
            {/* <Link to={"/signup"} className={styles.navigationLink}>
              Create an account.
            </Link> */}
            <br />
          </h2>
          <h2 className={styles.subHeading}>
            <ForgotPwdLoginPopup />
            {/* <Link to={"/"} className={styles.navigationLink}>
              Forgot password?
            </Link> */}
            <br />
          </h2>
        </div>
      </div>
    </>
  );
}

export default Login;
