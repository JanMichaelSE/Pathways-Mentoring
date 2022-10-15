import { useState, useEffect } from "react";
import Notes from "@/components/common/Records/Notes/notes";
import RecordClockIcon from "@/assets/record-clock-icon.svg";
import RecordCompleteIcon from "@/assets/record-complete-icon.svg";
import RecordDescIcon from "@/assets/record-desc-icon.svg";
import RecordNotesIcon from "@/assets/record-notes.svg";

import styles from "./individual-record.module.css";

function IndividualRecord({
  title,
  description,
  stage,
  role,
  noteId,
  onSubmitRecord,
  onApproveRecord,
  onRejectRecord,
}) {
  const [btnUser, setBtnUser] = useState(false);
  const [btnStage, setBtnStage] = useState(false);
  const [messageStage, setMessageStage] = useState("");
  const [imageStage, setImageStage] = useState(null);
  const [showMessageStage, setShowMessageStage] = useState(false);

  useEffect(() => {
    if (role === "Student") {
      handleStudentStageState(stage);
    } else if (role === "Mentor") {
      handleMentorStageState(stage);
    }
  }, [stage]);

  function handleStudentStageState(stage) {
    if (stage === "Approved") {
      setBtnStage(false);
      setMessageStage("Record is Completed");
      setImageStage(RecordCompleteIcon);
      setShowMessageStage(true);
    } else if (stage === "Pending Approval") {
      setBtnStage(false);
      setMessageStage("Record is Pending Approval");
      setImageStage(RecordClockIcon);
      setShowMessageStage(true);
    } else {
      setBtnStage(true);
      setBtnUser(true);
      setMessageStage("");
      setShowMessageStage(false);
      setImageStage(null);
    }
  }

  function handleMentorStageState(stage) {
    if (stage === "Approved") {
      setBtnStage(false);
      setMessageStage("Record is Completed");
      setImageStage(RecordCompleteIcon);
      setShowMessageStage(true);
    } else if (stage === "Pending Approval") {
      setBtnStage(true);
      setBtnUser(false);
      setMessageStage("Record is Pending Approval");
      setImageStage(RecordClockIcon);
      setShowMessageStage(true);
    } else {
      setBtnStage(false);
      setMessageStage("");
      setShowMessageStage(false);
      setImageStage(null);
    }
  }

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
            <img className={styles.imageStage} src={imageStage} alt="" />
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
                  id={styles.btnSubmit}
                  className={styles.itemRight}
                  type={"button"}
                  onClick={onSubmitRecord}
                >
                  Submit Record
                </button>
              ) : (
                <>
                  <div className={styles.itemRight}>
                    <button id={styles.btnReject} type={"button"} onClick={onRejectRecord}>
                      Reject
                    </button>
                    <button id={styles.btnApprove} type={"button"} onClick={onApproveRecord}>
                      Approve
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.recordDescriptionContainer}>
          <img src={RecordDescIcon} alt="record-desc-icon" />
          {descriptionList()}
        </div>
        <h1 className={styles.line}>
          <img
            className={styles.lineImg}
            src={RecordNotesIcon}
            alt="Record Notes Icon"
            style={{ marginRight: "20px" }}
          ></img>
          Notes
        </h1>
        <Notes noteId={noteId} />
      </div>
    </>
  );
}

export default IndividualRecord;
