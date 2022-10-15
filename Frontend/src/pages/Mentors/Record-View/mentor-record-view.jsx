import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import { Spinner, useToast } from "@chakra-ui/react";
import { httpApproveRecord, httpRejectRecord, httpGetRecordById } from "@/api/records.api";
import IndividualRecord from "@/components/common/Records/IndividualRecord/individual-record";

import styles from "./mentor-record-view.module.css";

function RecordView() {
  const toast = useToast();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [record, setRecord] = useState();

  useEffect(() => {
    async function loadRecordData() {
      const response = await httpGetRecordById(params.recordId);

      if (response.hasError) {
        return toast({
          description: "Could not load the data for this record. Please try again later.",
          status: "error",
          position: "top",
          duration: 5000,
        });
      }

      setRecord({ ...response.data });
      setIsLoading(false);
    }
    loadRecordData();
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

  if (params?.recordId == null) {
    return <Navigate to={"../"} replace />;
  }

  if (isLoading) {
    return (
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        position="absolute"
        top="30%"
        left="50%"
      />
    );
  }

  return (
    <>
      <div className={styles.container}>
        <IndividualRecord
          title={record.title}
          description={record.description}
          stage={record.stage}
          noteId={record.note.id}
          onApproveRecord={onApproveRecord}
          onRejectRecord={onRejectRecord}
          role={"Mentor"}
        />
      </div>
    </>
  );
}

export default RecordView;
