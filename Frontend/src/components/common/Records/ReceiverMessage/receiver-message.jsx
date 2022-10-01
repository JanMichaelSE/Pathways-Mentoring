import React from "react";
import styles from "./receiver-message.module.css";

function ReceiverMessage() {
  return (
    <div className={styles.container}>
      <div className={styles.messageContainer}>
        <div className={styles.receiverContainer}>
          Good afternoon, may I ask your help to make me a research on
          cybersecurity? I am very interested in growing as a professional in
          this field of computer science.
        </div>
        <div className={styles.timeContainer}>8/24/2022 - 12:28</div>
      </div>
    </div>
  );
}

export default ReceiverMessage;
