import React from "react";
import styles from "./sender-message.module.css";

function SenderMessage() {
  return (
    <div className={styles.container}>
      <div className={styles.messageContainer}>
        <div className={styles.senderContainer}>
          Greetings student, of course I may help you with your research on
          cybersecurity.
        </div>
        <div className={styles.timeContainer}>8/24/2022 - 12:28</div>
      </div>
    </div>
  );
}

export default SenderMessage;
