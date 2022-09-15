import { useState, useEffect } from "react";

import { Spinner, Flex, Center, Text } from "@chakra-ui/react";

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
    console.log("Use Effect Time Selector Picker Value 1:", firstInterval);
    console.log("Use Effect Time Selector Picker Value 2:", secondInterval);
    if (firstInterval && secondInterval) {
      updateInterval(`${firstInterval}-${secondInterval}`);
    }
  }, [firstInterval, secondInterval]);

  const updateFirstInterval = (tiempo) => {
    console.log("Time Picker Selector Value Interval 1: ", tiempo);
    setFirstInterval(tiempo);
  };

  const updateSecondInterval = (tiempo) => {
    console.log("Time Picker Selector Value Interval 2: ", tiempo);
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
      <Flex>
        <Center w={"120px"} mr={"10px"}>
          <TimePickerComponent
            value={timeSplit[0]}
            edit={edit}
            updateTimePickerInterval={updateFirstInterval}
          />
        </Center>
        <Center w={"30px"} mr={"10px"}>
          <Text>to</Text>
        </Center>
        <Center w={"120px"} mr={"10px"}>
          <TimePickerComponent
            value={timeSplit[1]}
            edit={edit}
            updateTimePickerInterval={updateSecondInterval}
          />
        </Center>
      </Flex>
    </>
  );
}
export default TimePickerSelector;
