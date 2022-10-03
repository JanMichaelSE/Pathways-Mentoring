import { useField } from "formik";
import QuestionCard from "../QuestionCard/question-card";
import MultiAnswer from "../MultiAnswer/multi-answer";
import styles from "./question-multi-answer.module.css";

function QuestionMultiAnswer({ number, question, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  function handleChange(multiAnswer) {
    const values = multiAnswer.map((v) => v);
    setValue(values);
  }

  function getDefaultValues() {
    let values = [];

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
