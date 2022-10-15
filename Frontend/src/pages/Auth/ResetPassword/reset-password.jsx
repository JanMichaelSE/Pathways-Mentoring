import { Link } from "react-router-dom";

import AuthLock from "@/assets/authlock.svg";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm/reset-password-form";

import styles from "./reset-password.module.css";

function ResetPassword() {
  return (
    <>
      <div className={styles.loginBackground}>
        <div className={styles.logoContainer}>
          <img className={styles.pathwayLogo} src={AuthLock} alt="AuthLock-Logo" />
        </div>
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>Reset your password</h1>
        </div>
        <div className={styles.formContainer}>
          <ResetPasswordForm />
        </div>
        <div className={styles.linkContainer}>
          <h2 className={styles.subHeading}>
            <Link to={"/"} className={styles.navigationLink}>
              Back to Login
            </Link>
            <br />
          </h2>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
