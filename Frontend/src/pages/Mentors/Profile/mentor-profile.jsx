import MentorProfileForm from "@/components/Mentors/MentorsProfileForm/mentor-profile-form";
import styles from "./mentor-profile.module.css";
function MentorProfile() {
  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <MentorProfileForm />
      </div>
    </div>
  );
}

export default MentorProfile;
