import { useState, useEffect } from "react";

import { Spinner, Text } from "@chakra-ui/react";

import TimePickerComponent from "@/components/Mentors/TimeComponents/TimePicker/time-picker";

import styles from "./time-picker-selector.module.css";

function TimePickerSelector({ time, edit, updateInterval }) {
  const [timeSplit, setTimeSplit] = useState(["", ""]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstInterval, setFirstInterval] = useState("");
  const [secondInterval, setSecondInterval] = useState("");

  // Load Initial Data
  useEffect(() => {
    var timeValue = splitTime(time);
    setTimeSplit(timeValue);
    setIsLoading(false);
  }, []);

  // Handle Schedule Data
  useEffect(() => {
    if (firstInterval && secondInterval) {
      updateInterval(`${firstInterval}-${secondInterval}`);
    }
  }, [firstInterval, secondInterval]);

  const updateFirstInterval = (tiempo) => {
    setFirstInterval(tiempo);
  };

  const updateSecondInterval = (tiempo) => {
    setSecondInterval(tiempo);
  };

  function splitTime(time) {
    if (time && time.includes("-")) {
      return time.split("-");
    }
    return ["", ""];
  }

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
      <div className={styles.timePickerSelectorContainer}>
        <div className={styles.timePickerComponentContainer}>
          <TimePickerComponent
            value={timeSplit[0]}
            edit={edit}
            updateTimePickerInterval={updateFirstInterval}
          />
        </div>
        <div className={styles.midpointContainer}>
          <Text>to</Text>
        </div>
        <div className={styles.timePickerComponentContainer}>
          <TimePickerComponent
            value={timeSplit[1]}
            edit={edit}
            updateTimePickerInterval={updateSecondInterval}
          />
        </div>
      </div>
    </>
  );
}
export default TimePickerSelector;
