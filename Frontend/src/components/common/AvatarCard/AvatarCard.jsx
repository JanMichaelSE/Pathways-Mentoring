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
  Spacer,
} from "@chakra-ui/react";
import styles from "./AvatarCard.module.css";

export default function AvatarCard({ cardData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <Center onClick={onOpen} py={6}>
        <Box
          px={20}
          maxW={"275px"}
          w={"full"}
          bg={"#FFFFFF"}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={10}
          textAlign={"center"}
        >
          <Avatar
            size={"2xl"}
            borderWidth={"2px"}
            borderStyle={"dashed"}
            borderColor={"#93B3D3"}
            background={"#F1F8FC"}
            src={cardData.avatarLink}
            alt={"Avatar Alt"}
            mb={4}
            pos={"relative"}
            p={3}
          />
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {cardData.name}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            {cardData.department}
          </Text>

          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            <Image
              px={2}
              py={1}
              boxSize="65px"
              objectFit="cover"
              src="/assets/Gmail-Logo.svg"
              alt="Email Icon"
            />
            <Image
              px={2}
              py={1}
              boxSize="50px"
              objectFit="cover"
              src="/assets/Phone-Squared.svg"
              alt="Phone Squared Icon"
            />
            <Image
              px={2}
              py={1}
              boxSize="50px"
              objectFit="cover"
              src="/assets/Company.svg"
              alt="Company.svg"
            />
          </Stack>
        </Box>
      </Center>
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
              <button type="submit" className={styles.button}>
                Request Mentoring
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
                  src={cardData.avatarLink}
                  alt={"Avatar Alt"}
                  mb={4}
                  p={5}
                />
                <Heading fontSize={"2xl"} fontFamily={"body"}>
                  {cardData.name}
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
                  <Text fontWeight={"400"}>{cardData.telephone}</Text>
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
              <HStack
                px={3}
                py={3}
                rounded={"27px"}
                bg={"#D9E4EA"}
                mx={3}
                my={5}
                boxShadow={"md"}
                maxWidth={"2xl"}
                justifyContent="center"
              >
                <Image
                  boxSize="50px"
                  objectFit="cover"
                  src="/assets/info.svg"
                  alt="info.svg"
                />
                <Text fontWeight={"400"}>
                  Will only accept calls on fridays at work. If need of any
                  other information please contact me by email. In any case I am
                  available on Monday and Friday from 12:00 PM to 4:00 PM.
                </Text>
              </HStack>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
