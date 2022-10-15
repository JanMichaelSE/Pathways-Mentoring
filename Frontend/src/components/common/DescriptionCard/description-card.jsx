import styles from "./description-card.module.css";

function DescriptionCard({ title, children }) {
  return (
    <div className={styles.assessmentInformationContainer}>
      <h1 className={styles.assessmentTitle}>{title}</h1>
      <div className={styles.assessmentDescriptionContainer}>
        <h1>Description:</h1>
        <div className={styles.assessmentDescription}>{children}</div>
      </div>
    </div>
  );
}

export default DescriptionCard;
