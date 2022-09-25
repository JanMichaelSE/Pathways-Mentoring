import styles from "./assessment-results-column.module.css";

function AssessmentResultsColumn({ title, items }) {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.itemsList}>
        {items.map((item, index) => (
          <div key={index} className={styles.itemContainer}>
            <p className={styles.item}>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssessmentResultsColumn;
