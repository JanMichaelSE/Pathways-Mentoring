import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";

import { httpGetAssessment } from "@/api/assignments.api";

import AssessmentQuestion from "@/components/Students/AssessmentQuestion/AssessmentQuestion";
import Button from "@/components/common/Button/button.jsx";

import styles from "./assessment-edit.module.css";

function AssessmentsEdit({ assessmentId }) {
  const toast = useToast();
  const [assessmentData, setAssessmentData] = useState({});

  function valueInitializer(questionType) {
    if (questionType == "select" || questionType == "text") {
      return "";
    } else {
      return [];
    }
  }

  function validationHelper(questionType) {
    if (questionType == "select" || questionType == "text") {
      return Yup.string().required("Question is required");
    } else {
      return Yup.array().required().min(1, "Question is required");
    }
  }

  // This section is still not working
  useEffect(() => {
    async function loadAssessmentInfo() {
      const assessmentInfo = await httpGetAssessment(assessmentId);
      setAssessmentData(assessmentInfo.data);
      if (assessmentInfo.hasError) {
        return toast({
          description: assessmentInfo.errorMessage,
          status: "error",
          position: "top",
          duration: "5000",
        });
      }
    }
    loadAssessmentInfo();
  }, []);

  // To be developed
  async function handleSubmit(assessmentInfo) {}

  return (
    <div div className={styles.assessmentContainer}>
      <Formik
        initialValues={{
          question1: valueInitializer("select"),
          question2: valueInitializer("text"),
          question3: valueInitializer("multi-select"),
        }}
        validationSchema={Yup.object({
          question1: validationHelper("select"),
          question2: validationHelper("text"),
          question3: validationHelper("multi-select"),
        })}
      >
        <Form className={styles.assessmentContainer}>
          <div className={styles.assessmentInformationContainer}>
            <p className={styles.assessmentTitle}>Pathways Assessment</p>
            <div className={styles.assessmentDescriptionContainer}>
              <h1>Description:</h1>
              <p className={styles.assessmentDescription}>
                This assessment is intended to help you...
              </p>
            </div>
          </div>
          {/*------------------------ Begin Select Question Type --------------------*/}
          <AssessmentQuestion
            number={1}
            type="select"
            options={["Yes", "No"]}
            question="Are you planning to study as a graduate student?"
          />
          {/*------------------------ End Select Question Type --------------------*/}

          {/*------------------------ Begin Textbox Question Type --------------------*/}
          <AssessmentQuestion
            number={2}
            type="text-answer"
            question="What is your classification"
          />
          {/*------------------------ End Textbox Question Type --------------------*/}

          {/*------------------------ Begin Multiple Select Question Type --------------------*/}
          <AssessmentQuestion
            number={3}
            type="multi-select"
            question="What programming languages of the following are you familiar with?"
            options={[
              "Javascript",
              "C++",
              "C#",
              "Python",
              "Java",
              "Ruby",
              "Golang",
            ]}
          />

          {/*------------------------ End Multiple Select Question Type --------------------*/}
          <div className={styles.buttonContainer}>
            <Button>Submit</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default AssessmentsEdit;
