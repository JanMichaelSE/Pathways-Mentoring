import styles from "./AssessmentQuestion.module.css";

import MultiSelect from "@/components/common/MultiSelect/multiSelect";
import Select from "@/components/common/Select/select.jsx";
import Textarea from "@/components/common/Textarea/textarea.jsx";

import DropdownIcon from "@/assets/select-dropdown.svg";

function AssessmentQuestion({ number, ...props }) {
  let { question, type, options } = props;

  const selectStyle = {
    backgroundImage: `url(${DropdownIcon})`,
    backgroundPosition: "right",
    border: "none",
    borderRadius: "10px",
    height: "75px",
    width: "100%",
    boxShadow: "0 0 3px var(--color-grey)",
    backgroundColor: "rgba(224, 230, 234, 0.5)",
  };

  return (
    <div className={styles.questionContainer}>
      <div className={styles.questionHeader}>
        <div className={styles.numberContainer}>{number}</div>
        <h1 className={styles.question}>{question}</h1>
      </div>
      <div className={styles.answer}>
        {type == "select" ? (
          <Select style={selectStyle} name={`question${number}`}>
            <option value="">Select Option</option>
            {options.map((option) => {
              return <option key={option} value={option}>{`${option}`}</option>;
            })}
          </Select>
        ) : type == "text-answer" ? (
          <Textarea
            name={`question${number}`}
            placeholder={"Enter your answer"}
          />
        ) : (
          <MultiSelect
            name={`question${number}`}
            label="Select Option"
            options={options}
          />
        )}
      </div>
    </div>
  );
}

export default AssessmentQuestion;
