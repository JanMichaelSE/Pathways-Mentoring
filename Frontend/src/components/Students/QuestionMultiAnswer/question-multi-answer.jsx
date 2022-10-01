import { useField } from "formik";
import QuestionCard from "../QuestionCard/question-card";
import styles from "./question-multi-answer.module.css";

function QuestionMultiAnswer({ number, question, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  function handleChange(event) {
    const value = event.target.value;
    setValue(value);
  }

  return (
    <QuestionCard number={number} question={question} meta={meta}>
      <textarea
        placeholder="Enter Answer"
        className={styles.textarea}
        {...field}
        {...props}
        onChange={handleChange}
      />
    </QuestionCard>
  );
}

export default QuestionMultiAnswer;
