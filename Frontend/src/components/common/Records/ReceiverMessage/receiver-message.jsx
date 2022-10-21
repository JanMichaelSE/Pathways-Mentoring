import React from "react";
import styles from "./receiver-message.module.css";

function ReceiverMessage({ message, date }) {
  // TODO: REFACTOR CODE
  function getFormatDate() {
    let d = new Date(date);
    let month = "" + d.toLocaleString("en-US", { month: "2-digit" });
    let day = "" + d.toLocaleString("en-US", { day: "2-digit" });
    let year = d.getFullYear();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    let time = "";
    if (hour > 12) {
      hour -= 12;
      time = `${hour}:${minutes}pm`;
    } else {
      hour -= 12;
      time = `${hour}:${minutes}am`;
    }

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day, year].join("/") + " " + time;
  }

  return (
    <div className={styles.container}>
      <div className={styles.messageContainer}>
        <div className={styles.receiverContainer}>{message}</div>
        <div className={styles.timeContainer}>{getFormatDate()}</div>
      </div>
    </div>
  );
}

export default ReceiverMessage;
