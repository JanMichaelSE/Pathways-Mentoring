import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

import { httpApproveRecord, httpRejectRecord } from "@/api/records.api";
import IndividualRecord from "@/components/common/Records/IndividualRecord/individual-record";

import styles from "./mentor-record-view.module.css";

function RecordView() {
  const toast = useToast();
  const { state } = useLocation();
  const [record, setRecord] = useState(state?.record);

  useEffect(() => {
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, []);

  async function onApproveRecord() {
    const studentId = record.studentId;
    const recordId = record.id;
    const response = await httpApproveRecord(studentId, recordId);

    if (response.hasError) {
      return toast({
        description: recordsResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    setRecord({ ...response.data });
    toast({
      title: "Record has been approved!",
      status: "success",
      position: "top",
      duration: 5000,
    });
  }

  async function onRejectRecord() {
    const studentId = record.studentId;
    const recordId = record.id;
    const response = await httpRejectRecord(studentId, recordId);

    if (response.hasError) {
      return toast({
        description: recordsResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    setRecord({ ...response.data });
    toast({
      title: "Record has been rejected.",
      status: "success",
      position: "top",
      duration: 5000,
    });
  }

  if (state?.record == null) {
    return <Navigate to={"../"} replace />;
  }

  return (
    <>
      <div className={styles.container}>
        <IndividualRecord
          title={record.title}
          description={record.description}
          stage={record.stage}
          onApproveRecord={onApproveRecord}
          onRejectRecord={onRejectRecord}
          role={"Mentor"}
        />
      </div>
    </>
  );
}

export default RecordView;
