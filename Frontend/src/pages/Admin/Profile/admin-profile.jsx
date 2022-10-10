import AdminProfileForm from "@/components/Admin/AdminProfileForm/admin-profile-form";
import styles from "./admin-profile.module.css";
function AdminProfile() {
  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <AdminProfileForm />
      </div>
    </div>
  );
}

export default AdminProfile;
