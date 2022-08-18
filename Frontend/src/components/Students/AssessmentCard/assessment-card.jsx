import { Link } from "react-router-dom";
import styles from "./assessment-card.module.css";

function AssessmentCard({ id, title, description }) {
  return (
    <Link className={styles.assessment} to={`/student/assessments/${id}`}>
      <h1 className={styles.assessmentTitle}>{title}</h1>
      <div className={styles.assessmentDescription}>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default AssessmentCard;
