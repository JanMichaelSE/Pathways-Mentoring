import React from "react";
import styles from "./individual-record.module.css";

function IndividualRecord({ title, description }) {
  function descriptionList() {
    const listItems = description.split(";");

    return (
      <ul className={styles.listItems}>
        {listItems.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
    );
  }
  return (
    <>
      <div className={styles.recordContainer}>
        <h1 className={styles.recordTitle}>{title}</h1>
        <div className={styles.recordDescriptionContainer}>
          <img src="/assets/record-desc-icon.svg" alt="record-desc-icon" />
          {descriptionList()}
        </div>
        <h1 className={styles.line}>
          <img
            className={styles.lineImg}
            src="/assets/record-notes.svg"
            style={{ marginRight: "20px" }}
          ></img>
          Notes
        </h1>
      </div>
    </>
  );
}

export default IndividualRecord;
