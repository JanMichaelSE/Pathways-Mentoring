import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Image,
  Link,
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
import styles from "./avatar-card.module.css";
import OfficeHours from "../../Mentors/OfficeHours/office-hours";
import ProfilePicture from "../Profile/ProfilePicture/profile-picture";

function AvatarCard({ cardData, buttonFunction, messageButton, studentSide }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [firstName, lastName] = cardData.name.split("; ");
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    let urlStudentId = searchParams.get("studentId");
    if (urlStudentId) {
      if (cardData.id == urlStudentId) {
        onOpen();
        searchParams.delete("studentId");
        setSearchParams(searchParams);
      }
    }
  }, []);

  function onModalSubmit() {
    buttonFunction(cardData);
  }

  function loadPhoneComponent() {
    if (!!cardData.phone) {
      return (
        <>
          <HStack px={3} py={3} rounded={"27px"} bg={"#D9E4EA"} boxShadow={"md"}>
            <Image
              boxSize="50px"
              objectFit="cover"
              src="/assets/cellphone.svg"
              alt="Cellphone.svg"
            />
            <Text fontWeight={"400"}>{cardData.phone}</Text>
          </HStack>
        </>
      );
    }
  }

  function loadEmailComponent() {
    if (!!cardData.email) {
      return (
        <>
          <HStack px={3} py={3} rounded={"27px"} bg={"#D9E4EA"} boxShadow={"md"}>
            <Image
              boxSize="50px"
              objectFit="cover"
              src="/assets/circled-envelope.svg"
              alt="Company.svg"
            />
            <Link href={`mailto:${cardData.email}`} fontWeight={"400"}>
              {cardData.email}
            </Link>
          </HStack>
        </>
      );
    }
  }
  function loadAcademicDegreeComponent() {
    if (!!cardData.academicDegree) {
      return (
        <>
          <HStack px={3} py={3} rounded={"27px"} bg={"#D9E4EA"} boxShadow={"md"} minWidth={"180px"}>
            <Image
              boxSize="50px"
              objectFit="cover"
              src="/assets/graduation-cap.svg"
              alt="Company.svg"
            />
            <Text fontWeight={"400"}>{cardData.academicDegree}</Text>
          </HStack>
        </>
      );
    }
  }
  function loadDescriptionComponent() {
    if (!!cardData.description) {
      return (
        <>
          <HStack
            px={3}
            py={3}
            rounded={"27px"}
            bg={"#D9E4EA"}
            mx={3}
            my={5}
            boxShadow={"md"}
            maxWidth={"2xl"}
            justifyContent="start"
            minW={"670px"}
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
        </>
      );
    }
  }

  function loadOfficeHoursComponent() {
    if (!!cardData.officeHours) {
      return <OfficeHours timeString={cardData.officeHours} />;
    }
  }

  return (
    <>
      <Center py={6}>
        <Box
          px={20}
          maxWidth={"275px"}
          maxHeight={"400px"}
          minHeight={"400px"}
          w={"full"}
          bg={"#FFFFFF"}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={10}
          textAlign={"center"}
          onClick={onOpen}
          cursor={"pointer"}
        >
          <ProfilePicture avatar={cardData.profilePicture} />
          <Heading fontSize={"2xl"} fontFamily={"body"} noOfLines={2}>
            {`${firstName} ${lastName}`}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            {cardData.department || cardData.fieldOfStudy}
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
          paddingTop={"1rem"}
          paddingBottom={"3rem"}
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
              <button type="submit" className={styles.button} onClick={onModalSubmit}>
                {messageButton}
              </button>
            </HStack>
          </ModalHeader>
          <ModalBody pb={6}>
            <Center align="stretch">
              <Stack align={"center"} justify={"center"} mx={6}>
                <ProfilePicture avatar={cardData.profilePicture} />
                <Heading fontSize={"2xl"} fontFamily={"body"}>
                  {`${firstName} ${lastName}`}
                </Heading>
                <Text fontWeight={600} color={"gray.500"}>
                  {cardData.department || cardData.fieldOfStudy}
                </Text>
              </Stack>
            </Center>
            <Center flexDir={"column"} mt={7}>
              <Stack
                alignItems={"center"}
                justifyContent={"space-between"}
                direction={"row"}
                spacing={2}
                minW={"670px"}
              >
                {loadPhoneComponent()}
                {loadEmailComponent()}
                {loadAcademicDegreeComponent()}
              </Stack>
              {studentSide && (
                <>
                  {loadDescriptionComponent()}
                  {loadOfficeHoursComponent()}
                </>
              )}
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AvatarCard;
