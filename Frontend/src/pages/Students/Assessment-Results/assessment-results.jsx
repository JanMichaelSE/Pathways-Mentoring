import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAssessmentStore } from "@/store/assessment.store";
import { Spinner } from "@chakra-ui/react";

import DescriptionCard from "@/components/common/DescriptionCard/description-card";
import AssessmentResultsGrid from "@/components/Students/AssessmentResultsGrid/assessment-results-grid";
import Button from "@/components/common/Button/button";

import { httpGetPathwaysAssessment } from "@/api/assessments.api";

import styles from "./assessment-results.module.css";

function AssessmentResults() {
  const navigate = useNavigate();
  const assessment = useAssessmentStore((state) => state.assessment);
  const setAssessment = useAssessmentStore((state) => state.setAssessment);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function loadAssessmentResults() {
      const assessmentResponse = await httpGetPathwaysAssessment();

      if (assessmentResponse.hasError) {
        return toast({
          description: assessmentResponse.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }

      setAssessment(assessmentResponse.data);
      setIsLoading(false);
    }

    if (assessment == null) {
      loadAssessmentResults();
    } else {
      setIsLoading(false);
    }
  }, []);

  function goBack() {
    navigate("../assessments", { replace: true });
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
    <div className={styles.container}>
      <DescriptionCard title={"Assessment Results"}>
        <p>
          Below is a summary of your self-assessment for skills and knowledge. This assessment will
          be used to recommend career paths that may be a good fit you. We recommend that you look
          this over to confirm that you have ranked each item appropriately. You might also find it
          helpful to ask a mentor or colleague their opinion of your proficiency on each of these
          skills and knowledge areas.
        </p>
      </DescriptionCard>
      <AssessmentResultsGrid assessmentResults={assessment} />

      <div className={styles.buttonContainer}>
        <Button onClick={goBack}>BACK</Button>
      </div>
    </div>
  );
}

export default AssessmentResults;
