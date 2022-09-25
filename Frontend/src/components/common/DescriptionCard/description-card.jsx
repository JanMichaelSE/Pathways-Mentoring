import styles from "./description-card.module.css";

function DescriptionCard({ title, description }) {
  return (
    <div className={styles.assessmentInformationContainer}>
      <h1 className={styles.assessmentTitle}>{title}</h1>
      <div className={styles.assessmentDescriptionContainer}>
        <h1>Description:</h1>
        <p className={styles.assessmentDescription}>{description}</p>
      </div>
    </div>
  );
}

export default DescriptionCard;
