import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useToast, Spinner } from "@chakra-ui/react";

import { useDevelopmentPlanStore } from "@/store/developmentPlan.store";
import { httpGetDevelopmentPlanQuestion } from "@/api/DevelopmentPlan.api";

import QuestionGenerator from "@/components/Students/QuestionGenerator/question-generator";
import Button from "@/components/common/Button/button.jsx";
import DescriptionCard from "@/components/common/DescriptionCard/description-card";

import styles from "./development-plan.module.css";

function DevelopmentPlan() {
  const navigate = useNavigate();
  const toast = useToast();
  const developmentPlan = useDevelopmentPlanStore(
    (state) => state.developmentPlan
  );
  const setDevelopmentPlan = useDevelopmentPlanStore(
    (state) => state.setDevelopmentPlan
  );
  const [formInitialValues, setFormInitialValues] = useState({});
  const [formValidationSchema, setFormValidationSchema] = useState({});
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
    }

    return () => {
      second;
    };
  }, [third]);

  async function handleSubmit(assessmentInfo) {
    // let _answers = [];
    // for (const key in assessmentInfo) {
    //   let newAnswer = {};
    //   if (Array.isArray(assessmentInfo[key])) {
    //     const answer = assessmentInfo[key].join(";");
    //     newAnswer = {
    //       questionId: Number(key),
    //       answer: answer,
    //     };
    //   } else {
    //     newAnswer = {
    //       questionId: Number(key),
    //       answer: String(assessmentInfo[key]),
    //     };
    //   }
    //   _answers.push(newAnswer);
    // }
    // const answerResponse = await httpAnswerAssessment(_answers, assessment.id);
    // if (answerResponse.hasError) {
    //   return toast({
    //     description: answerResponse.errorMessage,
    //     status: "error",
    //     position: "top",
    //     duration: 5000,
    //   });
    // }
    // toast({
    //   description: "Assessment has been submitted!",
    //   status: "success",
    //   position: "top",
    //   duration: 5000,
    // });
    // setAssessment(answerResponse.data);
    // navigate("../assessment-results", { replace: true });
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
      <Formik
        initialValues={formInitialValues}
        validationSchema={formValidationSchema}
        onSubmit={async (values) => {
          await handleSubmit(values);
        }}
      >
        <Form className={styles.assessmentContainer}>
          <DescriptionCard
            title={assessment.name}
            description={assessment.description}
          />
          {assessment.questions.map((question, index) => (
            <QuestionGenerator
              key={question.id}
              id={question.id}
              index={index + 1}
              question={question.question}
              type={question.type}
              options={question.options}
            />
          ))}

          <div className={styles.buttonContainer}>
            <Button>Submit</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default DevelopmentPlan;
