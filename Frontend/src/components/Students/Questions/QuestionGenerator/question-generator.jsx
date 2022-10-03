import QuestionMultiSelect from "../QuestionMultiSelect/question-multiSelect";
import QuestionSelect from "../QuestionSelect/question-select";
import QuestionTextArea from "../QuestionTextArea/question-textarea";
import QuestionRating from "../QuestionRating/question-rating";
import QuestionMultiAnswer from "../QuestionMultiAnswer/question-multi-answer";

function QuestionGenerator({ index, id, question, type, options }) {
  if (type == "Rating") {
    return (
      <QuestionRating
        id={id}
        name={id}
        number={index}
        question={question}
        options={options}
      />
    );
  } else if (type == "Multi-select") {
    return (
      <QuestionMultiSelect
        id={id}
        name={id}
        number={index}
        question={question}
        options={options}
      />
    );
  } else if (type == "Select") {
    return (
      <QuestionSelect
        id={id}
        name={id}
        number={index}
        question={question}
        options={options}
      />
    );
  } else if (type == "Multi-Answer") {
    return (
      <QuestionMultiAnswer
        id={id}
        name={id}
        number={index}
        question={question}
        options={options}
      />
    );
  } else {
    return (
      <QuestionTextArea id={id} name={id} number={index} question={question} />
    );
  }
}

export default QuestionGenerator;
