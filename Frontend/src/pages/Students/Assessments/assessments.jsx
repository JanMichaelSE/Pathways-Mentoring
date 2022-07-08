import { useState } from "react";

import Button from "@/components/common/Button/button.jsx";
import styles from "./assessments.module.css";

function Assessments() {
  const [sortAscending, setSortAscending] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        <Button
          style={{
            width: "10vw",
            height: "8vh",
            fontSize: "20px",
            marginRight: "3vw",
          }}
        >
          Filter
        </Button>
        <Button style={{ width: "15vw", height: "8vh", fontSize: "20px" }}>
          Sort Desc
        </Button>
      </div>
      <div className={styles.assessmentsContainer}>
        <div className={styles.assessment}>
          {/*Assessment Title 1*/}
          {/*Assessment Description*/}
        </div>
        <div className={styles.assessment}>
          {/*Assessment Title 2*/}
          {/*Assessment Description*/}
        </div>
        <div className={styles.assessment}>
          {/*Assessment Title 3*/}
          {/*Assessment Description*/}
        </div>
        <div className={styles.assessment}>
          {/*Assessment Title 4*/}
          {/*Assessment Description*/}
        </div>
        <div className={styles.assessment}>
          {/*Assessment Title 5*/}
          {/*Assessment Description*/}
        </div>
        <div className={styles.assessment}>
          {/*Assessment Title 6*/}
          {/*Assessment Description*/}
        </div>
        <div className={styles.assessment}>
          {/*Assessment Title 7*/}
          {/*Assessment Description*/}
        </div>
        <div className={styles.assessment}>
          {/*Assessment Title 8*/}
          {/*Assessment Description*/}
        </div>
      </div>
    </div>
  );
}

export default Assessments;
