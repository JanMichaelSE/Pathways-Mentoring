import { useField } from "formik";
import Select from "react-select";
import QuestionCard from "../QuestionCard/question-card";

import styles from "./question-multiSelect-styles";

function QuestionMultiSelect({ number, question, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const options = props.options.split(";").map((option) => {
    return { value: option, label: option };
  });

  function onSelect(multiSelectValues) {
    const values = multiSelectValues.map((v) => v.value);
    setValue(values);
  }

  function getDefaultValues() {
    let values = [];

    for (const value of field.value) {
      values.push({ value: value, label: value });
    }

    return values;
  }

  return (
    <QuestionCard number={number} question={question} meta={meta}>
      <Select
        closeMenuOnScroll={false}
        isMulti
        defaultValue={getDefaultValues}
        options={options}
        styles={styles}
        placeholder="Select Option"
        onChange={onSelect}
      />
    </QuestionCard>
  );
}
export default QuestionMultiSelect;
