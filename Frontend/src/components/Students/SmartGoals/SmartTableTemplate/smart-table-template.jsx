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
          if (!!index) {
            results.push(index);
          }
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
              <th>GOALS</th>
              <th>SPECIFICS</th>
              <th>MEASURABLE</th>
              <th>ATTAINABLE</th>
              <th>RELEVANT</th>
              <th>TIME-BOUND</th>
            </tr>
          </thead>
          <DisplayRows items={getMultiAnswer()} />
        </table>
      </div>
    </>
  );
}

export default SmartTableTemplate;
