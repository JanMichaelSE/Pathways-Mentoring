import { useState, useEffect } from "react";

import { Spinner, useToast } from "@chakra-ui/react";
import { httpGetAllAssessments } from "@/api/assessments.api";
import AssessmentCard from "@/components/Students/AssessmentCard/assessment-card";
import NoItemsFound from "@/components/common/NoItemsFound/no-items-found";
import SadFaceIcon from "@/assets/sad-face-icon.svg";

import styles from "./assessments.module.css";

function Assessments() {
  const toast = useToast();
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortAscending, setSortAscending] = useState(true);
  const [filterOption, setFilterOption] = useState("none");

  useEffect(() => {
    async function loadAllAssessments() {
      const assessmentsResponse = await httpGetAllAssessments();

      if (assessmentsResponse.hasError) {
        return toast({
          description: assessmentsResponse.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }

      setAssessments(assessmentsResponse.data);
      setIsLoading(false);
    }

    loadAllAssessments();
  }, []);

  function onSort() {
    const toggleSort = !sortAscending;

    if (toggleSort) {
      assessments.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      assessments.sort((a, b) => a.name.localeCompare(b.name));
      assessments.reverse();
    }

    setAssessments(assessments);
    setSortAscending((prev) => !prev);
  }

  function loadAssessmentsComponent() {
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
    } else if (assessments.length === 0) {
      return (
        <NoItemsFound title="No assessment created yet" icon={SadFaceIcon} />
      );
    } else {
      return (
        <div className={styles.assessmentsGrid}>
          {assessments.map((data) => (
            <AssessmentCard
              key={data.id}
              id={data.id}
              title={data.name}
              description={data.description}
            />
          ))}
        </div>
      );
    }
  }

  return (
    <>
      <div className={styles.buttonsContainer}>
        <button className={`btn ${styles.button}`}>
          Filter
          <img src="/assets/Filter.png" />
        </button>
        <button className={`btn ${styles.button}`} onClick={onSort}>
          {sortAscending ? "Sort Desc" : "Sort Asc"}
        </button>
      </div>
      <div className={styles.assessmentContainer}>
        {loadAssessmentsComponent()}
      </div>
    </>
  );
}

export default Assessments;
