import StudentProfileForm from "@/components/Students/StudentsProfileForm/student-profile-form";
import styles from "./student-profile.module.css";
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
