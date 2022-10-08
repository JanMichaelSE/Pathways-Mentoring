import React from "react";
import styles from "./display-rows.module.css";

function DisplayRows({ items }) {
  return (
    <>
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className={styles.rows}>
            <td className={styles.firstColumn}>
              <ul>
                <li>{item}</li>
              </ul>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </>
  );
}

export default DisplayRows;
