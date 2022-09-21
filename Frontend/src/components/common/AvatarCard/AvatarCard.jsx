import React from "react";
import {
  useToast,
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

export default function AvatarCard({ cardData, buttonFunction }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();
  const [firstName, lastName] = cardData.name.split("; ");

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
            src={cardData.profilePicture}
            alt={"Avatar Alt"}
            mb={4}
            pos={"relative"}
            p={3}
          />
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {`${firstName} ${lastName}`}
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
                <Avatar
                  size={"lg"}
                  borderWidth={"2px"}
                  borderColor={"#99A9B9"}
                  background={"#5389BE"}
                  src={"/assets/info.svg"}
                  alt={"Avatar Alt"}
                  pos={"relative"}
                  p={3}
                />
                <Text fontWeight={"400"} textAlign={"justify"}>
                  {cardData.description}
                </Text>
              </HStack>
              <HStack
                px={3}
                py={3}
                rounded={"27px"}
                bg={"#D9E4EA"}
                mx={3}
                mb={5}
                boxShadow={"md"}
                maxWidth={"2xl"}
                justifyContent="center"
              >
                <Avatar
                  size={"lg"}
                  borderWidth={"2px"}
                  borderColor={"#99A9B9"}
                  background={"#5389BE"}
                  src={"/assets/Person_Calendar.png"}
                  alt={"Avatar Alt"}
                  pos={"relative"}
                  p={3}
                />
                <Text fontWeight={"400"} textAlign={"justify"}>
                  {cardData.officeHours}
                </Text>
              </HStack>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
