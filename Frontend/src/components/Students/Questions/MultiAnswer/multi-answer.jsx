import { useEffect, useState } from "react";

import styles from "./multi-answer.module.css";

function MultiAnswer({ initialValue, onChange }) {
  const [answerList, setAnswerList] = useState([{ service: "" }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let initialArrayValue = [];

    if (initialValue.length != 0) {
      for (const value of initialValue) {
        initialArrayValue.push({ service: value });
      }
    } else {
      initialArrayValue.push({ service: "" });
    }

    setAnswerList(initialArrayValue);
    setLoading(false);
  }, []);

  useEffect(() => {
    handleReturnValue();
  }, [answerList]);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...answerList];
    list[index][name] = value;
    setAnswerList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...answerList];
    list.splice(index, 1);
    setAnswerList(list);
  };

  const handleServiceAdd = () => {
    setAnswerList([...answerList, { service: "" }]);
  };

  function handleReturnValue() {
    let arrayListWithoutObject = [];
    for (const value of answerList) {
      arrayListWithoutObject.push(value.service);
    }
    onChange(arrayListWithoutObject);
  }

  if (loading) {
    return <></>;
  }

  return (
    <>
      {answerList.map((singleAnswer, index) => {
        return (
          <div key={index} className={styles.container}>
            <div className={styles.firstDivision}>
              <input
                name={"service"}
                type="text"
                className={styles.input}
                placeholder={"Enter Goal"}
                value={singleAnswer.service}
                onChange={(e) => handleServiceChange(e, index)}
              />
              {answerList.length - 1 === index && (
                <button
                  type="button"
                  className={styles.addBtn}
                  onClick={handleServiceAdd}
                >
                  <span>Add Goal</span>
                </button>
              )}
            </div>
            <div className={styles.secondDivision}>
              {answerList.length !== 1 && (
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => handleServiceRemove(index)}
                >
                  <span>
                    <img
                      src="/assets/idp-remove-icon.svg"
                      alt="idp-remove-icon"
                    />
                  </span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default MultiAnswer;
