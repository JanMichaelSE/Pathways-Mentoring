import React from "react";
import styles from "./display-rows.module.css";

function DisplayRows({ items }) {
  return (
    <>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td className={styles.rows} id={styles.firstColumn}>
              <ul>
                <li>{item}</li>
              </ul>
            </td>
            <td className={styles.rows}></td>
            <td className={styles.rows}></td>
            <td className={styles.rows}></td>
            <td className={styles.rows}></td>
            <td className={styles.rows}></td>
          </tr>
        ))}
      </tbody>
    </>
  );
}

export default DisplayRows;
