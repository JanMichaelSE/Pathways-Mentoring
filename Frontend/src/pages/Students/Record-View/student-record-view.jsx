import { useState, useEffect } from "react";

import { Navigate, useParams } from "react-router-dom";
import { httpSubmitRecord, httpGetRecordById } from "@/api/records.api";
import { Spinner, useToast } from "@chakra-ui/react";

import IndividualRecord from "@/components/common/Records/IndividualRecord/individual-record";

import styles from "./student-record-view.module.css";

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

    setRecord({ ...response.data });
    toast({
      title: "Record has been submitted!",
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
          onSubmitRecord={onSubmitRecord}
          role={"Student"}
        />
      </div>
    </>
  );
}

export default RecordView;
