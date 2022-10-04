import { useLocation, Navigate } from "react-router-dom";
import { httpSubmitRecord } from "@/api/records.api";
import { useToast } from "@chakra-ui/react";

import IndividualRecord from "@/components/common/Records/IndividualRecord/individual-record";

import styles from "./student-record-view.module.css";
import { useState, useEffect } from "react";

function RecordView() {
  const toast = useToast();
  const { state } = useLocation();
  const [record, setRecord] = useState(state?.record);

  useEffect(() => {
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, []);

  async function onSubmitRecord() {
    const mentorId = record.mentorId;
    const recordId = record.id;
    const response = await httpSubmitRecord(mentorId, recordId);

    if (response.hasError) {
      return toast({
        description: recordsResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    console.log("Record Response: ", response.data);
    setRecord({ ...response.data });
    toast({
      title: "Record has been submitted!",
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
          onSubmitRecord={onSubmitRecord}
          role={"Student"}
        />
      </div>
    </>
  );
}

export default RecordView;
