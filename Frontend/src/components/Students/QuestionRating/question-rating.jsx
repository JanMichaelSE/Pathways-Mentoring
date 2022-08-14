import { useState } from "react";
import { useField } from "formik";

import QuestionCard from "../QuestionCard/question-card";
import RatingNumber from "../RatingNumber/rating-number";

import styles from "./question-rating.module.css";

function QuestionRating({ number, question, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const options = props.options.split(";");
  const initActiveOptions = options.map(() => false);
  const [activeList, setActiveList] = useState(initActiveOptions);

  function onActiveClick(activeIndex) {
    let newActiveList = [];
    for (let i = 0; i < activeList.length; i++) {
      if (i === activeIndex) {
        setValue(i + 1);
        newActiveList[i] = true;
      } else {
        newActiveList[i] = false;
      }
    }
    setActiveList(newActiveList);
  }

  return (
    <QuestionCard number={number} question={question} meta={meta}>
      <div className={styles.ratingContainer}>
        {options.map((number) => (
          <RatingNumber
            key={number}
            number={number}
            activeList={activeList}
            onActiveClick={onActiveClick}
          />
        ))}
      </div>
    </QuestionCard>
  );
}

export default QuestionRating;
