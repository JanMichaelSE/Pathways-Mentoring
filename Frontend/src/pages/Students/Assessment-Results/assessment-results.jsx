import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAssessmentStore } from "@/store/assessment.store";

import DescriptionCard from "@/components/common/DescriptionCard/description-card";
import AssessmentResultsGrid from "@/components/Students/AssessmentResultsGrid/assessment-results-grid";
import Button from "@/components/common/Button/button";

import styles from "./assessment-results.module.css";

function AssessmentResults() {
  const navigate = useNavigate();
  const assessment = useAssessmentStore((state) => state.assessment);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function goBack() {
    navigate("../assessments", { replace: true });
  }

  return (
    <div className={styles.container}>
      <DescriptionCard
        title={"Assessment Results"}
        description={
          "Below is a summary of your self-assessment for skills and knowledge.  This assessment will be used to recommend career paths that may be a good fit you.  We recommend that you look this over to confirm that you have ranked each item appropriately. You might also find it helpful to ask a mentor or colleague their opinion of your proficiency on each of these skills and knowledge areas. "
        }
      />
      <AssessmentResultsGrid assessmentResults={assessment} />

      <div className={styles.buttonContainer}>
        <Button onClick={goBack}>BACK</Button>
      </div>
    </div>
  );
}

export default AssessmentResults;
