import React from "react";
import styles from "./notes.module.css";

function Notes() {
  return (
    <>
      <div className={styles.notesContainer}>
        <div className={styles.messageContainer}></div>
        <div className={styles.buttonsContainer}>
          <input type="text" placeholder="Message" className={styles.input} />
          <button className={styles.btn}>Send</button>
        </div>
      </div>
    </>
  );
}

export default Notes;
