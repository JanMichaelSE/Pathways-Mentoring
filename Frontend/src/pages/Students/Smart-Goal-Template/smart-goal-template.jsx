import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDevelopmentPlanStore } from "@/store/developmentPlan.store";
import { Spinner } from "@chakra-ui/react";

import Button from "@/components/common/Button/button";

import { httpGetDevelopmentPlanQuestion } from "@/api/developmentPlan.api";

import styles from "./smart-goal-template.module.css";
import DescriptionSmartGoal from "@/components/Students/SmartGoals/DescriptionSmartGoal/description-smart-goal";
import SmartTableTemplate from "@/components/Students/SmartGoals/SmartTableTemplate/smart-table-template";
function SmartGoalTemplate() {
  const navigate = useNavigate();
  const developmentPlan = useDevelopmentPlanStore((state) => state.developmentPlan);
  const setDevelopmentPlan = useDevelopmentPlanStore((state) => state.setDevelopmentPlan);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function loadDevelopmentPlanInfo() {
      const developmentPlanResponse = await httpGetDevelopmentPlanQuestion();

      if (developmentPlanResponse.hasError) {
        return toast({
          description: developmentPlanResponse.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }
      setDevelopmentPlan(developmentPlanResponse.data);
      const isAnswered = isDevelopmentPlanAnswered(developmentPlanResponse.data);
      if (!isAnswered) {
        return navigate("../development-plan", { replace: true });
      }
      setIsLoading(false);
    }
    if (developmentPlan == null) {
      loadDevelopmentPlanInfo();
    } else {
      const isAnswered = isDevelopmentPlanAnswered(developmentPlan);
      if (!isAnswered) {
        return navigate("../development-plan", { replace: true });
      }
      setIsLoading(false);
    }
  }, []);

  function isDevelopmentPlanAnswered(developmentPlan) {
    for (const question of developmentPlan) {
      if (!!question.answers[0]?.answer) {
        return true;
      }
    }

    return false;
  }

  function goBack() {
    navigate("../development-plan", { replace: true });
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
      <div className={styles.developerPlanContainer}>
        <DescriptionSmartGoal />
        <SmartTableTemplate smartResult={developmentPlan} />
        <div className={styles.buttonContainer}>
          <Button onClick={goBack}>BACK</Button>
        </div>
      </div>
    </>
  );
}

export default SmartGoalTemplate;
