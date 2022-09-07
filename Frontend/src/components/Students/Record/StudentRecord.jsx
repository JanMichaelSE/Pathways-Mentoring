import React from "react";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  useMediaQuery,
  HStack,
  Progress,
  Spacer,
} from "@chakra-ui/react";
import styles from "./StudentRecord.module.css";

export default function StudentRecord({ recordData }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <Center py={6}>
        <Box
          px={20}
          maxW={"400px"}
          w={"full"}
          bg={"#FFFFFF"}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={10}
          textAlign={"center"}
        >
          <Box
            w="100%"
            maxH={"200px"}
            bgGradient='linear(#BDCED8, #FFFFFF)'
            borderColor={"#B2C0EE"}
            borderWidth={1}
            rounded={"lg"}
            px={4}
            py={6}
          >
            <Text className={styles.recordTittle}>{recordData.name}</Text>
            <Spacer py={3}/>
            <Text>Prof. {recordData.profesor}</Text>
            <Text>{recordData.date}</Text>
          </Box>
          <Spacer py={1} />
          <Box backgroundColor={"#BDCED8"} p={3} rounded="lg">
          <Progress borderColor={"#FFFFFF"} borderWidth={2} colorScheme={recordData.rating != 100? "blue" : "whatsapp"} size='lg' value={recordData.rating} rounded="lg" />
          </Box>
        </Box>
      </Center>
    </>
  );
}