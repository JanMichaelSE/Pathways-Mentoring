import { Link } from "react-router-dom";
import InputText from "@/components/common/InputText/input-text";
import styles from "./signup.module.css";

function Signup() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h1 className={styles.heading}>
            Create Account
          </h1>
          <h4 className={styles.subHeading}>Already have an account? <Link to={'/'} className={styles.navigationLink}>Log In</Link></h4>
        </div>

        {/* Creating Student Form Component */}
        <div className={styles.formContainer}>
          <InputText label="First Name" required={true}/>
          <InputText label="First Name" required={true}/>
          <InputText label="First Name" required={true}/>
          <InputText label="First Name" required={true}/>
          <InputText label="First Name" required={true}/>
          <InputText label="First Name" required={true}/>
          <InputText label="First Name" required={true}/>
        </div>
      </div>
    </>
  );
};

export default Signup