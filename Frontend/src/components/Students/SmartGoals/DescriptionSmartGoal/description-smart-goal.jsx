import React from "react";

import DescriptionCard from "@/components/common/DescriptionCard/description-card";
import styles from "./description-smart-goal.module.css";

function DescriptionSmartGoal() {
  return (
    <DescriptionCard title={"Individual Development Plan"}>
      <p>
        Create goals that are specific, measurable, align with your career goals
        and the goals of the organization. Be sure your goals are realistic but
        challenging, and that you are personally committed to and comfortable
        with each one. The description of each column is the following
      </p>
      <b>Specific:</b>
      <ul>
        <li className={styles.list}>
          Create goals that are specific, measurable, align with your career
          goals and the goals of the organization. Be sure your goals are
          realistic but challenging, and that you are personally committed to
          and comfortable with each one. The description of each column is the
          following:
        </li>
      </ul>
      <b>Measurable:</b>
      <ul>
        <li className={styles.list}>
          Create goals that are specific, measurable, align with your career
          goals and the goals of the organization. Be sure your goals are
          realistic but challenging, and that you are personally committed to
          and comfortable with each one. The description of each column is the
          following:
        </li>
      </ul>
      <b>Attainable:</b>
      <ul>
        <li className={styles.list}>
          Create goals that are specific, measurable, align with your career
          goals and the goals of the organization. Be sure your goals are
          realistic but challenging, and that you are personally committed to
          and comfortable with each one. The description of each column is the
          following:
        </li>
      </ul>
      <b>Relevant:</b>
      <ul>
        <li className={styles.list}>
          Create goals that are specific, measurable, align with your career
          goals and the goals of the organization. Be sure your goals are
          realistic but challenging, and that you are personally committed to
          and comfortable with each one. The description of each column is the
          following:
        </li>
      </ul>
      <b>Time-Bound:</b>
      <ul>
        <li className={styles.list}>
          Create goals that are specific, measurable, align with your career
          goals and the goals of the organization. Be sure your goals are
          realistic but challenging, and that you are personally committed to
          and comfortable with each one. The description of each column is the
          following:
        </li>
      </ul>
    </DescriptionCard>
  );
}

export default DescriptionSmartGoal;
