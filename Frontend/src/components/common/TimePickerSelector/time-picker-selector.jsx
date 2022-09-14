import TimePickerComponent from "../TimePicker/time-picker";
import { useState, useEffect } from "react";
import styles from "./time-picker-selector.module.css";
import { Spinner, Flex, Center, Text } from "@chakra-ui/react";
import { useUserStore } from "@/store/user.store";

function TimePickerSelector(props) {
  const [timeSplit, setTimeSplit] = useState(["", ""]);
  const [isLoading, setIsLoading] = useState(true);
  const [valueInterval1, setValueInterval1] = useState("");
  const [valueInterval2, setValueInterval2] = useState("");
  const submitValue = useUserStore((state) => state.submitValue);

  useEffect(() => {
    var timeValue = splitTime(props.value);
    setTimeSplit(timeValue);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (submitValue == true) {
      console.log("Value 1:", valueInterval1);
      console.log("Value 2:", valueInterval2);
      if (valueInterval1 != null && valueInterval2 != null) {
        props.updatetime(`${valueInterval1}-${valueInterval2}`);
      }
    }
  }, [valueInterval1, valueInterval2]);

  const updateFirstInterval = (tiempo) => {
    console.log("tiempo en time selector antes: ", tiempo);
    setValueInterval1(tiempo);
    console.log("tiempo en time selector despues: ", valueInterval1);
  };

  const updateSecondInterval = (tiempo) => {
    setValueInterval2(tiempo);
    console.log("Value Interval 2: ", valueInterval2);
  };

  // function updateFirstInterval(tiempo) {
  //   console.log("tiempo1: ", tiempo);
  //   setValueInterval1(tiempo);
  //   console.log("Value Interval 1: ", valueInterval1);
  // }
  // function updateSecondInterval(tiempo) {
  //   setValueInterval2(tiempo);
  //   console.log("Value Interval 2: ", valueInterval2);
  // }

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
          <TimePickerComponent
            value={timeSplit[0]}
            edit={props.edit}
            updatetimepicker={updateFirstInterval}
          />
        </Center>
        <Center w={"30px"} mr={"10px"}>
          <Text>to</Text>
        </Center>
        <Center w={"120px"} mr={"10px"}>
          <TimePickerComponent
            value={timeSplit[1]}
            edit={props.edit}
            updatetimepicker={updateSecondInterval}
          />
        </Center>
      </Flex>
    </>
  );
}
export default TimePickerSelector;
