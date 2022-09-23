import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

import { httpGetPathwaysAssessment, httpAnswerAssessment } from "@/api/assessments.api";
import QuestionGenerator from "@/components/Students/QuestionGenerator/question-generator";
import Button from "@/components/common/Button/button.jsx";

import styles from "./assessment-edit.module.css";

function AssessmentsEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast();
  const assessmentId = params.id;
  const [assessment, setAssessment] = useState({});
  const [formInitialValues, setFormInitialValues] = useState({});
  const [formValidationSchema, setFormValidationSchema] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAssessmentInfo() {
      const assessmentResponse = await httpGetPathwaysAssessment();

      if (assessmentResponse.hasError) {
        return toast({
          description: assessmentResponse.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }

      initForm(assessmentResponse.data);
      setAssessment(assessmentResponse.data);
      setIsLoading(false);
    }

    loadAssessmentInfo();
  }, []);

  function questionInitialValue(type) {
    return type == "Multi-select" || type == "Select" ? [] : "";
  }

  function questionValidation(type) {
    if (type == "Multi-select" || type == "Select") {
      return Yup.array().min(1, "Must select atleast 1 option.").required("Question is required");
    } else {
      return Yup.string().required("Question is required");
    }
  }

  function initForm(assessmentData) {
    let _initialValues = {};
    let _validationSchema = {};
    let _questions = assessmentData.questions;

    for (const question of _questions) {
      let key = question.id;
      _initialValues[key] = questionInitialValue(question.type);
      _validationSchema[key] = questionValidation(question.type);
    }

    setFormInitialValues(_initialValues);
    setFormValidationSchema(Yup.object().shape({ ..._validationSchema }));
  }

  async function handleSubmit(assessmentInfo) {
    let _answers = [];

    for (const key in assessmentInfo) {
      let newAnswer = {};
      if (Array.isArray(assessmentInfo[key])) {
        const answer = assessmentInfo[key].join(";");
        newAnswer = {
          questionId: Number(key),
          answer: answer,
        };
      } else {
        newAnswer = {
          questionId: Number(key),
          answer: String(assessmentInfo[key]),
        };
      }
      _answers.push(newAnswer);
    }

    const answerResponse = await httpAnswerAssessment(_answers, assessmentId);

    if (answerResponse.hasError) {
      return toast({
        description: answerResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    toast({
      description: "Assessment has been submitted!",
      status: "success",
      position: "top",
      duration: 5000,
    });

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
    <div className={styles.assessmentContainer}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={formValidationSchema}
        onSubmit={async (values) => {
          await handleSubmit(values);
        }}
      >
        <Form className={styles.assessmentContainer}>
          <div className={styles.assessmentInformationContainer}>
            <h1 className={styles.assessmentTitle}>{assessment.name}</h1>
            <div className={styles.assessmentDescriptionContainer}>
              <h1>Description:</h1>
              <p className={styles.assessmentDescription}>{assessment.description}</p>
            </div>
          </div>
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
    </div>
  );
}

export default AssessmentsEdit;
