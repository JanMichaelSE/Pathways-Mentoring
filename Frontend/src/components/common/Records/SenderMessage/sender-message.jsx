import React from "react";
import { formatDate } from "@/utils/helpers";
import styles from "./sender-message.module.css";

function SenderMessage({ message, date }) {
  return (
    <div className={styles.container}>
      <div className={styles.messageContainer}>
        <div className={styles.senderContainer}>{message}</div>
        <div className={styles.timeContainer}>{formatDate(date)}</div>
      </div>
    </div>
  );
}

export default SenderMessage;
