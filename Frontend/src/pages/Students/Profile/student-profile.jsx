import styles from "./student-profile.module.css";
import Button from "@/components/common/Button/button";
import StudentProfileForm from "@/components/Students/StudentsProfileForm/student-profile-form";
function StudentProfile() {
  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <StudentProfileForm />
      </div>
    </div>
  );
}

export default StudentProfile;
