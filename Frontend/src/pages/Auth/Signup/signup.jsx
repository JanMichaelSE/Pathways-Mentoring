import { Link } from "react-router-dom";
import InputText from "@/components/common/InputText/input-text";
import styles from "./signup.module.css";

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

        {/* Creating Student Form Component */}
        <div className={styles.formContainer}>
          <div className={styles.form}>
            <div>
              <label className={styles.label} htmlFor="FirstName">
                First Name *
              </label>
              <input
                className={styles.inputText}
                name="FirstName"
                type="text"
                required
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="LastName">
                Last Name *
              </label>
              <input
                className={styles.inputText}
                name="LastName"
                type="text"
                required
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="SecondLastName">
                Second Last Name *
              </label>
              <input
                className={styles.inputText}
                name="SecondLastName"
                type="text"
                required
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="Phone">
                Phone Number
              </label>
              <input className={styles.inputText} name="Phone" type="text" />
            </div>

            <div>
              <label className={styles.label} htmlFor="Email">
                Email *
              </label>
              <input className={styles.inputText} name="Email" type="text" />
            </div>

            <div>
              <label className={styles.label} htmlFor="Password">
                Password *
              </label>
              <input className={styles.inputText} name="Password" type="text" />
            </div>

            <div>
              <label className={styles.label} htmlFor="ConfirmPassword">
                Confirm Password *
              </label>
              <input
                className={styles.inputText}
                name="ConfirmPassword"
                type="text"
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="Gender">
                Gender *
              </label>
              <select className={styles.inputSelect} name="Gender">
                <option value="N/A">Select Option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className={styles.label} htmlFor="FieldOfStudy">
                Field of Study *
              </label>
              <input
                className={styles.inputText}
                name="FieldOfStudy"
                type="text"
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="Institution">
                Institution
              </label>
              <input
                className={styles.inputSearch}
                name="Institution"
                type="text"
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="GPA">
                GPA
              </label>
              <input
                className={`${styles.inputText} ${styles.inputNumeric}`}
                name="GPA"
                type="text"
              />
            </div>
          </div>

          <button className={styles.button}>Sign Up</button>
        </div>
      </div>
    </>
  );
}

export default Signup;
