import { Box, Center, Text, Progress, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import styles from "./record-card.module.css";

export default function StudentRecord({ recordData }) {
  const navigate = useNavigate();

  function onRecordClick() {
    navigate(`../records/${recordData.id}`, { replace: true, state: { record: recordData } });
  }

  function getProgressValue() {
    if (recordData.stage === "Approved") {
      return 100;
    } else if (recordData.stage === "Pending Approval") {
      return 50;
    } else {
      return 5;
    }
  }

  function formatDate() {
    let d = new Date(recordData.createdDate);
    let month = "" + d.toLocaleString("en-US", { month: "2-digit" });
    let day = "" + d.toLocaleString("en-US", { day: "2-digit" });
    let year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day, year].join("-");
  }

  return (
    <>
      <Center py={6}>
        <Box
          onClick={onRecordClick}
          cursor={"pointer"}
          px={20}
          maxW={"400px"}
          minH={"315px"}
          w={"full"}
          bg={"#FFFFFF"}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={10}
          textAlign={"center"}
        >
          <Box
            w="100%"
            minH={"200px"}
            bgGradient="linear(#BDCED8, #FFFFFF)"
            borderColor={"#B2C0EE"}
            borderWidth={1}
            rounded={"lg"}
            px={4}
            py={6}
          >
            <Text className={styles.recordTitle}>{recordData.title}</Text>
            <Spacer py={3} />
            <Text>Prof. {recordData.mentor.name}</Text>
            <Text>{formatDate()}</Text>
          </Box>
          <Spacer py={1} />
          <Box backgroundColor={"#BDCED8"} p={3} rounded="lg">
            <Progress
              borderColor={"#FFFFFF"}
              borderWidth={2}
              colorScheme={getProgressValue() != 100 ? "blue" : "whatsapp"}
              size="lg"
              value={getProgressValue()}
              rounded="lg"
            />
          </Box>
        </Box>
      </Center>
    </>
  );
}
