import React from "react";
import { formatDate } from "@/utils/helpers";
import styles from "./receiver-message.module.css";

function ReceiverMessage({ message, date }) {
  return (
    <div className={styles.container}>
      <div className={styles.messageContainer}>
        <div className={styles.receiverContainer}>{message}</div>
        <div className={styles.timeContainer}>{formatDate(date)}</div>
      </div>
    </div>
  );
}

export default ReceiverMessage;
