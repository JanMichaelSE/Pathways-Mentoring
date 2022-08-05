import { Link } from "react-router-dom";
import styles from "./AssessmentPreview.module.css";

function AssessmentPreview({ assessmentId, assessmentInfo }) {
  //const { title, description } = assessmentInfo;

  return (
    <Link
      className={styles.assessment}
      to={`/student/assessments/${assessmentId}`}
    >
      <h1 className={styles.assessmentTitle}>
        Measurement Skills
        {/*Assessment Title*/}
      </h1>
      <div className={styles.assessmentDescription}>
        <p>
          {/*Assessment Description*/}
          Some placeholder text just to see how a sentence would look like
          inside of this.
        </p>
      </div>
    </Link>
  );
}

export default AssessmentPreview;
