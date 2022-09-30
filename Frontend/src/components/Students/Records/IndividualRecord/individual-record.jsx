import { useState, useEffect } from "react";
import Notes from "../Notes/notes";
import styles from "./individual-record.module.css";

function IndividualRecord({ title, description, stage, role }) {
  const [btnUser, setBtnUser] = useState(false);
  const [btnStage, setBtnStage] = useState(false);
  const [messageStage, setMessageStage] = useState("");
  const [imageStage, setImageStage] = useState("");
  const [showMessageStage, setShowMessageStage] = useState(false);

  useEffect(() => {
    if (role === "Student") {
      if (stage === "Approved") {
        setBtnStage(false);
        setMessageStage("Record is Completed");
        setImageStage("record-complete-icon");
        setShowMessageStage(true);
      } else if (stage === "Pending Approval") {
        setBtnStage(false);
        setMessageStage("Record is Pending Approval");
        setImageStage("record-clock-icon");
        setShowMessageStage(true);
      } else {
        setBtnStage(true);
        setBtnUser(true);
        setMessageStage("");
        setShowMessageStage(false);
        setImageStage("");
      }
    } else if (role === "Mentor") {
      if (stage === "Approved") {
        setBtnStage(false);
        setMessageStage("Record is Completed");
        setImageStage("record-complete-icon");
        setShowMessageStage(true);
      } else if (stage === "Pending Approval") {
        setBtnStage(true);
        setBtnUser(false);
        setMessageStage("Record is Pending Approval");
        setImageStage("record-clock-icon");
        setShowMessageStage(true);
      } else {
        setBtnStage(false);
        setMessageStage("");
        setShowMessageStage(false);
        setImageStage("");
      }
    }
  }, []);

  function descriptionList() {
    const listItems = description.split(";");

    return (
      <ul className={styles.listItems}>
        {listItems.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    );
  }
  return (
    <>
      {showMessageStage ? (
        <div className={styles.recordStage}>
          <div className={styles.contentStage}>
            <img
              className={styles.imageStage}
              src={`/assets/${imageStage}.svg`}
              alt=""
            />
            <h1 className={styles.titleStage}>{messageStage}</h1>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className={styles.recordContainer}>
        <div className={styles.flexContainer}>
          <h1 className={styles.itemCenter}>{title}</h1>
          {btnStage ? (
            <>
              {btnUser ? (
                <button
                  type={"button"}
                  className={styles.itemRight}
                  id={styles.btnSubmit}
                >
                  Submit Record
                </button>
              ) : (
                <>
                  <button
                    type={"button"}
                    className={styles.itemRight}
                    id={styles.btnReject}
                  >
                    Reject
                  </button>
                  <button type={"button"} id={styles.btnApprove}>
                    Approve
                  </button>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
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
        <Notes />
      </div>
    </>
  );
}

export default IndividualRecord;
