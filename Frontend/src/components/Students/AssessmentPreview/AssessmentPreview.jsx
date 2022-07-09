import styles from "./AssessmentPreview.module.css";

function AssessmentPreview({ assessment }) {
  //const { title, description, date } = assessment;

  return (
    <div className={styles.assessment}>
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
    </div>
  );
}

export default AssessmentPreview;
