import { useState } from "react";

import Button from "@/components/common/Button/button.jsx";
import AssessmentPreview from "@/components/Students/AssessmentPreview/AssessmentPreview";

import styles from "./assessments.module.css";

function Assessments({ assessments }) {
  const [sortAscending, setSortAscending] = useState(true);
  //Initial State for the filter so that it just shows all assessments
  const [filterOption, setFilterOption] = useState("none");

  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "7rem",
            height: "3rem",
            fontSize: "var(--font-size--regular)",
            padding: "3px",
            marginRight: "20px",
          }}
        >
          Filter
          <img src="/assets/Filter.png" />
        </Button>
        <Button
          style={{
            width: "8rem",
            height: "3rem",
            fontSize: "var(--font-size--regular)",
          }}
        >
          {sortAscending ? "Sort Desc" : "Sort Asc"}
        </Button>
      </div>
      <div className={styles.assessmentsContainer}>
        <AssessmentPreview />
        <AssessmentPreview />
        <AssessmentPreview />
        <AssessmentPreview />
        <AssessmentPreview />
        <AssessmentPreview />
        <AssessmentPreview />
        <AssessmentPreview />
      </div>
    </div>
  );
}

export default Assessments;
