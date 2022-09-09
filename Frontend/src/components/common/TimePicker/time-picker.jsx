import { useState, useEffect } from "react";
import styles from "./time-picker.module.css";
import { Spinner } from "@chakra-ui/react";

function TimePickerComponent(props) {
  const [time, setTime] = useState(["", "", ""]);
  const [isLoading, setIsLoading] = useState(true);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [meridian, setMeridien] = useState("");
  const [test, setTest] = useState(["00", "00", "am"]);

  useEffect(() => {
    var timeValue = splitTime(props.value);
    setTime(timeValue);
    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   first;

  //   return () => {
  //     second;
  //   };
  // }, [time[0], time[1], time[2]]);

  function splitTime(time) {
    if (time.includes(":")) {
      return time.split(":");
    }
    return ["00", "00", "am"];
  }

  function handleChangeHour(e) {
    console.log(test);
    test.splice(0, 1, e.target.value);
    console.log(test);
  }
  function handleChangeMinute(e) {
    console.log(test);
    test.splice(1, 1, e.target.value);
    console.log(test);
  }
  function handleChangeMeridian(e) {
    console.log(test);
    test.splice(2, 1, e.target.value);
    console.log(test);
  }

  const hours = [...Array(13).keys()].splice(1, 12);
  const minutes = [...Array(60).keys()].splice(0, 60);

  const hourarray = hours.map((hour) => {
    return (
      <option key={hour} value={hour.toString().padStart(2, "0")}>
        {hour.toString().padStart(2, "0")}
      </option>
    );
  });
  const minutearray = minutes.map((minute) => {
    return (
      <option key={minute} value={minute.toString().padStart(2, "0")}>
        {minute.toString().padStart(2, "0")}
      </option>
    );
  });

  if (isLoading) {
    return (
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        position="absolute"
        top="30%"
        left="50%"
      />
    );
  }
  return (
    <>
      <div className={styles.timePicker} data-time="00:00">
        <div className={styles.hour}>
          <div className={styles.hrUp}></div>
          <select
            name="time"
            className={styles.hr}
            defaultValue={time[0]}
            disabled={props.edit}
            onChange={handleChangeHour}
          >
            <option value="00">00</option>
            {hourarray}
          </select>
          <div className={styles.hrDown}></div>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.minute}>
          <div className={styles.minUp}></div>
          <select
            name="time"
            className={styles.min}
            defaultValue={time[1]}
            disabled={props.edit}
            onChange={handleChangeMinute}
          >
            <option value="00">00</option>
            {minutearray}
          </select>
          <div className={styles.minDown}></div>
          <div className={styles.separator}></div>
          <div className={styles.meridiem}>
            <select
              name="time"
              className={styles.meri}
              defaultValue={time[2]}
              disabled={props.edit}
              onChange={handleChangeMeridian}
            >
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
