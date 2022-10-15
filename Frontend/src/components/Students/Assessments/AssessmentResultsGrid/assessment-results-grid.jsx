import AssessmentResultsColumn from "../AssessmentResultsColumn/assessment-results-column";

import styles from "./assessment-results-grid.module.css";

function AssessmentResultsGrid({ assessmentResults }) {
  function getVeryLowResults() {
    const results = [];

    for (const item of assessmentResults.questions) {
      if (item.answer == "1") {
        results.push(item.question);
      }
    }

    return results;
  }

  function getBelowAverageResults() {
    const results = [];

    for (const item of assessmentResults.questions) {
      if (item.answer == "2") {
        results.push(item.question);
      }
    }

    return results;
  }

  function getAverageResults() {
    const results = [];

    for (const item of assessmentResults.questions) {
      if (item.answer == "3") {
        results.push(item.question);
      }
    }

    return results;
  }

  function getAboveAverageResults() {
    const results = [];

    for (const item of assessmentResults.questions) {
      if (item.answer == "4") {
        results.push(item.question);
      }
    }

    return results;
  }

  function getVeryHighResults() {
    const results = [];

    for (const item of assessmentResults.questions) {
      if (item.answer == "5") {
        results.push(item.question);
      }
    }

    return results;
  }

  return (
    <div className={styles.container}>
      <AssessmentResultsColumn title="Very Low" items={getVeryLowResults()} />
      <AssessmentResultsColumn title="Below Average" items={getBelowAverageResults()} />
      <AssessmentResultsColumn title="Average" items={getAverageResults()} />
      <AssessmentResultsColumn title="Above Average" items={getAboveAverageResults()} />
      <AssessmentResultsColumn title="Very High" items={getVeryHighResults()} />
    </div>
  );
}

export default AssessmentResultsGrid;
