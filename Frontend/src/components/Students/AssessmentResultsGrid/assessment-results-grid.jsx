import AssessmentResultsColumn from "../AssessmentResultsColumn/assessment-results-column";

import styles from "./assessment-results-grid.module.css";

function AssessmentResultsGrid() {
  return (
    <div className={styles.container}>
      <AssessmentResultsColumn />
      <AssessmentResultsColumn />
      <AssessmentResultsColumn />
      <AssessmentResultsColumn />
      <AssessmentResultsColumn />
    </div>
  );
}

export default AssessmentResultsGrid;
