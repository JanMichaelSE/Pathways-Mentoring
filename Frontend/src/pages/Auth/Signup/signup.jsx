import { Link } from "react-router-dom";
import styles from "./signup.module.css";
import StudentForm from "@/components/Auth/StudentForm/student-form";
import MentorForm from "@/components/Auth/MentorForm/mentor-form";

function Signup() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h1 className={styles.heading}>Create Account</h1>
          <h4 className={styles.subHeading}>
            Already have an account?{" "}
            <Link to={"/"} className={styles.navigationLink}>
              Log In
            </Link>
          </h4>
        </div>

        {/* <StudentForm /> */}
        <MentorForm />
      </div>
    </>
  );
}

export default Signup;
