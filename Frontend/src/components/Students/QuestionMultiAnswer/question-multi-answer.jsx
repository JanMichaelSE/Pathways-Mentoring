import { useField } from "formik";
import QuestionCard from "../QuestionCard/question-card";
import MultiAnswer from "../MultiAnswer/multi-answer";
import styles from "./question-multi-answer.module.css";

function QuestionMultiAnswer({ number, question, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  // console.log("Field Value:", meta.value);
  console.log("meta.answers: ", meta.initialValue);
  // const options = meta.initialValue.map((answer) => {
  //   return { serv: option, label: option };
  // });

  function handleChange(multiAnswer) {
    const values = multiAnswer.map((v) => v);
    // console.log("Multi Answer", multiAnswer);
    setValue(values);
  }

  function getDefaultValues() {
    let values = [];
    console.log("field value: ", field);

    for (const value of field.value) {
      values.push({ service: value });
    }

    return values;
  }

  return (
    <QuestionCard number={number} question={question} meta={meta}>
      <MultiAnswer
        initialValue={meta.initialValue}
        defaultValue={getDefaultValues}
        onChange={handleChange}
      />
    </QuestionCard>
  );
}

export default QuestionMultiAnswer;
