import TimePickerComponent from "../TimePicker/time-picker";
import { useState, useEffect } from "react";
import styles from "./time-picker-selector.module.css";
import { Spinner, Flex, Center, Text } from "@chakra-ui/react";

function TimePickerSelector(props) {
  const [timeSplit, setTimeSplit] = useState(["", ""]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    var timeValue = splitTime(props.value);
    setTimeSplit(timeValue);
    setIsLoading(false);
  }, []);

  function splitTime(time) {
    if (time.includes("-")) {
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
          <TimePickerComponent value={timeSplit[0]} edit={props.edit} />
        </Center>
        <Center w={"30px"} mr={"10px"}>
          <Text>to</Text>
        </Center>
        <Center w={"120px"} mr={"10px"}>
          <TimePickerComponent value={timeSplit[1]} edit={props.edit} />
        </Center>
      </Flex>
    </>
  );
}
export default TimePickerSelector;
