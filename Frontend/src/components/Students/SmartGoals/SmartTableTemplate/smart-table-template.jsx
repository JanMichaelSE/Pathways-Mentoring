import React from "react";
import styles from "./smart-table-template.module.css";

function SmartTableTemplate({ smartResult }) {
  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <tr className={styles.firstRow}>
            <th className={styles.goals}>GOALS</th>
            <th className={styles.goals}>SPECIFICS</th>
            <th className={styles.goals}>MEASURABLE</th>
            <th className={styles.goals}>ATTAINABLE</th>
            <th className={styles.goals}>RELEVANT</th>
            <th className={styles.goals}>TIME-BOUND</th>
          </tr>
          <tr>
            <td className={styles.goals}>GOALS</td>
            <td className={styles.goals}>GOALS</td>
            <td className={styles.goals}>GOALS</td>
            <td className={styles.goals}>GOALS</td>
            <td className={styles.goals}>GOALS</td>
            <td className={styles.goals}>GOALS</td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default SmartTableTemplate;
