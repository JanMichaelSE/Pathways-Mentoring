import styles from "./question-card.module.css";

function QuestionCard({ number, question, meta, children }) {
  function questionContainerStyles() {
    return meta.touched && meta.error
      ? `border-error ${styles.questionContainer}`
      : styles.questionContainer;
  }

  return (
    <div className={questionContainerStyles()}>
      <div className={styles.questionHeader}>
        <div className={styles.numberContainer}>{number}</div>
        <h1 className={styles.question}>{question}</h1>
      </div>
      <div className={styles.answer}>{children}</div>
    </div>
  );
}

export default QuestionCard;
