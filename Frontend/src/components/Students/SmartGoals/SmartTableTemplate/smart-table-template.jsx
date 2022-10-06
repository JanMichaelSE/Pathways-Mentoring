import React from "react";
import DisplayRows from "../DisplayRows/display-rows";
import styles from "./smart-table-template.module.css";

function SmartTableTemplate({ smartResult }) {
  function getMultiAnswer() {
    const results = [];

    for (const item of smartResult) {
      if (item.type == "Multi-Answer") {
        var arrayAnswer = item.answers[0].answer.split(";");
        for (const index of arrayAnswer) {
          results.push(index);
        }
      }
    }

    return results;
  }
  getMultiAnswer();
  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.firstRow}>
              <th className={styles.goals}>GOALS</th>
              <th className={styles.goals}>SPECIFICS</th>
              <th className={styles.goals}>MEASURABLE</th>
              <th className={styles.goals}>ATTAINABLE</th>
              <th className={styles.goals}>RELEVANT</th>
              <th className={styles.goals}>TIME-BOUND</th>
            </tr>
          </thead>
          <DisplayRows items={getMultiAnswer()} />
        </table>
      </div>
    </>
  );
}

export default SmartTableTemplate;
