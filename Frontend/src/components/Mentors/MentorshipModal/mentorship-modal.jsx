import React, {useEffect} from "react";
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
  Spacer,
} from "@chakra-ui/react";
import styles from "./MentorshipModal.module.css";
import { useEffect } from "react";

function ModalMentorship({cardData, buttonFunction, messageButton }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [firstName, lastName] = cardData.name.split("; ");

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  function clickFunction() {
    buttonFunction(cardData);
  }

  useEffect(() => {
    onOpen()
}, []);
   
   return(
   <>
          <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={isLargerThan768 ? "4xl" : "md"}
        rounded={"27px"}
      >
        <ModalOverlay />
        <ModalContent
          borderWidth={"2px"}
          borderStyle={"dashed"}
          borderColor={"#0066CC"}
        >
          <ModalHeader>
            <HStack alignItems={"center"}>
              <Image
                boxSize="40px"
                objectFit="cover"
                src="/assets/back.svg"
                alt="back.svg"
                onClick={onClose}
                cursor="pointer"
              />
              <Spacer />
              <button
                type="submit"
                className={styles.button}
                onClick={clickFunction}
              >
                {messageButton}
              </button>
            </HStack>
          </ModalHeader>
          <ModalBody pb={6}>
            <Center align="stretch">
              <Stack align={"center"} justify={"center"} mx={6}>
                <Avatar
                  size={"2xl"}
                  background={"#F1F8FC"}
                  borderWidth={"2px"}
                  borderColor={"#0874E0"}
                  src={cardData.profilePicture}
                  alt={"Avatar Alt"}
                  mb={4}
                  p={5}
                />
                <Heading fontSize={"2xl"} fontFamily={"body"}>
                  {`${firstName} ${lastName}`}
                </Heading>
                <Text fontWeight={600} color={"gray.500"}>
                  {cardData.department}
                </Text>
              </Stack>
            </Center>
            <Center flexDir={"column"} mt={7}>
              <Stack
                align={"center"}
                justify={"center"}
                direction={"row"}
                spacing={8}
              >
                <HStack
                  px={3}
                  py={3}
                  rounded={"27px"}
                  bg={"#D9E4EA"}
                  mx={3}
                  pr={5}
                  boxShadow={"md"}
                >
                  <Image
                    boxSize="50px"
                    objectFit="cover"
                    src="/assets/cellphone.svg"
                    alt="Cellphone.svg"
                  />
                  <Text fontWeight={"400"}>{cardData.phone}</Text>
                </HStack>
                <HStack
                  px={3}
                  py={3}
                  rounded={"27px"}
                  bg={"#D9E4EA"}
                  mx={3}
                  pr={5}
                  boxShadow={"md"}
                >
                  <Image
                    boxSize="50px"
                    objectFit="cover"
                    src="/assets/circled-envelope.svg"
                    alt="Company.svg"
                  />
                  <Text fontWeight={"400"}>{cardData.email}</Text>
                </HStack>
                <HStack
                  pl={2}
                  pr={3}
                  py={3}
                  rounded={"27px"}
                  bg={"#D9E4EA"}
                  mx={3}
                  my={5}
                  boxShadow={"md"}
                >
                  <Image
                    boxSize="50px"
                    objectFit="cover"
                    src="/assets/graduation-cap.svg"
                    alt="Company.svg"
                  />
                  <Text fontWeight={"400"}>{cardData.academicDegree}</Text>
                </HStack>
              </Stack>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>);
}

export default ModalMentorship;