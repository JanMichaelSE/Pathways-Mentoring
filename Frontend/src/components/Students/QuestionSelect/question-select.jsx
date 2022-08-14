import { useField } from "formik";
import Select from "react-select";
import QuestionCard from "../QuestionCard/question-card";

import styles from "./question-select-styles";

function QuestionSelect({ number, question, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const _options = props.options.split(";").map((option) => {
    return { value: option, label: option };
  });

  function onSelect(selectValue) {
    setValue([selectValue.value]);
  }

  return (
    <QuestionCard number={number} question={question} meta={meta}>
      <Select
        closeMenuOnScroll={false}
        options={_options}
        styles={styles}
        placeholder="Select Option"
        onChange={onSelect}
      />
    </QuestionCard>
  );
}

export default QuestionSelect;
