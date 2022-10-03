import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useToast, Spinner } from "@chakra-ui/react";

import { useDevelopmentPlanStore } from "@/store/developmentPlan.store";
import {
  httpGetDevelopmentPlanQuestion,
  httpAnswerDevelopmentPlan,
} from "@/api/developmentPlan.api";

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
      initForm(DevelopmentPlanResponse.data);
      setDevelopmentPlan(DevelopmentPlanResponse.data);
      setIsLoading(false);
    }
    if (developmentPlan == null) {
      loadDevelopmentPlanInfo();
    } else {
      initForm(developmentPlan);
      setIsLoading(false);
    }
  }, []);

  function questionInitialValue(question) {
    let initialValue = null;

    if (question.answers != 0 && question.type == "Multi-Answer") {
      let selectValues = question.answers[0]?.answer.split(";");
      initialValue = selectValues;
    } else if (question.answers != 0) {
      initialValue = question.answers[0]?.answer;
    } else {
      initialValue = question.type == "Multi-Answer" ? [] : "";
    }

    return initialValue;
  }

  function questionValidation(type) {
    if (type == "Multi-Answer") {
      return Yup.array()
        .min(1, "Must have at least 1 option.")
        .required("Question is required");
    } else {
      return Yup.string().required("Question is required");
    }
  }

  function initForm(developmentPlanData) {
    let _initialValues = {};
    let _validationSchema = {};
    let _questions = developmentPlanData;

    for (const question of _questions) {
      let key = question.id;
      _initialValues[key] = questionInitialValue(question);
      _validationSchema[key] = questionValidation(question.type);
    }

    setFormInitialValues(_initialValues);
    setFormValidationSchema(Yup.object().shape({ ..._validationSchema }));
  }

  async function handleSubmit(developmentPlanInfo) {
    let _answers = [];
    for (const key in developmentPlanInfo) {
      let newAnswer = {};
      if (Array.isArray(developmentPlanInfo[key])) {
        const answer = developmentPlanInfo[key].join(";");
        newAnswer = {
          questionId: Number(key),
          answer: answer,
        };
      } else {
        newAnswer = {
          questionId: Number(key),
          answer: String(developmentPlanInfo[key]),
        };
      }
      _answers.push(newAnswer);
    }

    const answerResponse = await httpAnswerDevelopmentPlan(_answers);

    if (answerResponse.hasError) {
      return toast({
        description: answerResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }
    toast({
      description: "Development Plan has been submitted!",
      status: "success",
      position: "top",
      duration: 5000,
    });
    //setDevelopmentPlan(answerResponse.data);    needs work on this TODO
    navigate("../smart-goal-template", { replace: true });
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
        <Form className={styles.developerPlanContainer}>
          <DescriptionCard title={"Individual Development Plan"}>
            <p>
              The Individual Development Plan (IDP) supports undergraduate
              researchers to set goals and identify strategies that will help
              them to reach those goals. It is a self-tracking tool that can
              also be used to facilitate mentor-mentee communication and
              alignment of expectations.
            </p>
          </DescriptionCard>

          {developmentPlan.map((question, index) => (
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
            <Button type={"submit"}>Submit</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default DevelopmentPlan;
