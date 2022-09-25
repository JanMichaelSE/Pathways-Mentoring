import { Link, useSearchParams } from "react-router-dom";
import styles from "./signup.module.css";
import StudentForm from "@/components/Auth/StudentForm/student-form";
import MentorForm from "@/components/Auth/MentorForm/mentor-form";

function Signup() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("role") || "";
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
        {(() => {
          if (searchTerm == "student") {
            return <StudentForm />;
          } else if (searchTerm == "mentor") {
            return <MentorForm />;
          }
        })()}
      </div>
    </>
  );
}

export default Signup;
