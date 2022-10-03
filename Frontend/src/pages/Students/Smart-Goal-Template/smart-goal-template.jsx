import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDevelopmentPlanStore } from "@/store/developmentPlan.store";
import { Spinner } from "@chakra-ui/react";

import Button from "@/components/common/Button/button";

import { httpGetDevelopmentPlanQuestion } from "@/api/developmentPlan.api";

import styles from "./smart-goal-template.module.css";
import DescriptionSmartGoal from "@/components/Students/DescriptionSmartGoal/description-smart-goal";
import SmartTableTemplate from "@/components/Students/SmartTableTemplate/smart-table-template";
function SmartGoalTemplate() {
  const navigate = useNavigate();
  const developmentPlan = useDevelopmentPlanStore(
    (state) => state.developmentPlan
  );
  const setDevelopmentPlan = useDevelopmentPlanStore(
    (state) => state.setDevelopmentPlan
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDevelopmentPlanInfo() {
      const DevelopmentPlanResponse = await httpGetDevelopmentPlanQuestion();

      if (DevelopmentPlanResponse.hasError) {
        return toast({
          description: DevelopmentPlanResponse.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }
      setDevelopmentPlan(DevelopmentPlanResponse.data);
      setIsLoading(false);
    }
    if (developmentPlan == null) {
      loadDevelopmentPlanInfo();
    } else {
      setIsLoading(false);
    }
  }, []);

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
      <div className={styles.developerPlanContainer}>
        <DescriptionSmartGoal />
        <SmartTableTemplate />
        <div className={styles.buttonContainer}>
          <Button type={"submit"}>Submit</Button>
        </div>
      </div>
    </>
  );
}

export default SmartGoalTemplate;
