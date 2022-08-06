import TimePickerComponent from "../TimePicker/time-picker";
import styles from "./time-picker-selector.module.css";
import { Flex, Center, Text } from "@chakra-ui/react";

function TimePickerSelector() {
  return (
    <>
      <Flex>
        <Center w={"120px"} mr={"10px"}>
          <TimePickerComponent />
        </Center>
        <Center w={"30px"} mr={"10px"}>
          <Text>to</Text>
        </Center>
        <Center w={"120px"} mr={"10px"}>
          <TimePickerComponent />
        </Center>
      </Flex>
    </>
  );
}
export default TimePickerSelector;
