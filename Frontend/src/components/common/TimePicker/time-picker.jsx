import React, { useState } from "react";
import styles from "./time-picker.module.css";
//import "rc-time-picker/assets/index.css";

function TimePickerComponent() {
  const [time, setTime] = useState("");

  const hours = [...Array(13).keys()].splice(1, 12);
  const minutes = [...Array(60).keys()].splice(0, 60);

  const hourarray = hours.map((hour) => {
    return (
      <option value={hour.toString().padStart(2, "0")}>
        {hour.toString().padStart(2, "0")}
      </option>
    );
  });
  const minutearray = minutes.map((minute) => {
    return (
      <option value={minute.toString().padStart(2, "0")}>
        {minute.toString().padStart(2, "0")}
      </option>
    );
  });

  return (
    <>
      <div className={styles.timePicker} data-time="00:00">
        <div className={styles.hour}>
          <div className={styles.hrUp}></div>
          <select name="time" className={styles.hr}>
            {hourarray}
          </select>
          <div className={styles.hrDown}></div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.minute}>
          <div className={styles.minUp}></div>
          <select name="time" className={styles.min}>
            {minutearray}
          </select>
          <div className={styles.minDown}></div>
          <div className={styles.separator}></div>
          <div className={styles.meridiem}>
            <select name="time" className={styles.meri}>
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default TimePickerComponent;
