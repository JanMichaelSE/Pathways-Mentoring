import React from "react";
import ReceiverMessage from "../ReceiverMessage/receiver-message";
import SenderMessage from "../SenderMessage/sender-message";
import styles from "./notes.module.css";

function Notes() {
  return (
    <>
      <div className={styles.notesContainer}>
        <div className={styles.messageContainer}>
          <ReceiverMessage />
          <SenderMessage />
        </div>
        <div className={styles.buttonsContainer}>
          <input type="text" placeholder="Message" className={styles.input} />
          <button type={"button"} className={styles.btn}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Notes;
