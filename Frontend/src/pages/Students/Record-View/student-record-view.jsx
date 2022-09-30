import { useEffect } from "react";
import IndividualRecord from "@/components/Students/Records/IndividualRecord/individual-record";

import styles from "./student-record-view.module.css";
import { useLocation, Navigate } from "react-router-dom";

function RecordView() {
  const { state } = useLocation();
  console.log("State: ", state);

  if (state?.record == null) {
    return <Navigate to={"../"} replace />;
  }

  return (
    <>
      <div className={styles.container}>
        <IndividualRecord
          title={state.record.title}
          description={state.record.description}
          stage={state.record.stage}
          role={"Student"}
        />
      </div>
    </>
  );
}

export default RecordView;
