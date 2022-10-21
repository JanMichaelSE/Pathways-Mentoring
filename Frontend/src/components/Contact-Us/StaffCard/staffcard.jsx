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
  Link,
} from "@chakra-ui/react";

import BackIcon from "@/assets/back.svg";
import CellPhoneIcon from "@/assets/cellphone.svg";
import CircledEnvelopeIcon from "@/assets/circled-envelope.svg";
import CompanyIcon from "@/assets/Company.svg";
import GmailIcon from "@/assets/Gmail-Logo.svg";
import GraduationCapIcon from "@/assets/graduation-cap.svg";
import PhoneSquaredIcon from "@/assets/Phone-Squared.svg";

export default function StaffCard({ cardData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <Center onClick={onOpen} py={6} cursor={"pointer"}>
        <Box
          px={20}
          pt={5}
          maxWidth={"275px"}
          maxHeight={"380px"}
          minHeight={"380px"}
          w={"full"}
          bg={"#FFFFFF"}
          boxShadow={"2xl"}
          rounded={"lg"}
          textAlign={"center"}
        >
          <Avatar
            size={"2xl"}
            backgroundColor="#F1F8FC"
            borderWidth={"2px"}
            borderStyle={"dashed"}
            borderColor={"#93B3D3"}
            src={cardData.avatarLink}
            alt={"Avatar Alt"}
            mb={4}
            pos={"relative"}
            p={3}
          />
          <Heading fontSize={"2xl"} fontFamily={"body"} noOfLines={2}>
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
              src={GmailIcon}
              alt="Email Icon"
            />
            <Image
              px={2}
              py={1}
              boxSize="50px"
              objectFit="cover"
              src={PhoneSquaredIcon}
              alt="Phone Squared Icon"
            />
            <Image
              px={2}
              py={1}
              boxSize="50px"
              objectFit="cover"
              src={CompanyIcon}
              alt="Company Icon"
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
          paddingBottom={"3rem"}
        >
          <ModalHeader>
            <HStack alignItems={"center"}>
              <Image
                boxSize="40px"
                objectFit="cover"
                src={BackIcon}
                alt="Back Icon"
                onClick={onClose}
                cursor="pointer"
              />
              <Spacer />
            </HStack>
          </ModalHeader>
          <ModalBody pb={6}>
            <Center align="stretch">
              <Stack alignItems={"center"} justifyContent={"center"} mx={6}>
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
                maxWidth={"670px"}
                minWidth={"670px"}
                alignItems={"center"}
                justifyContent={"space-between"}
                direction={"row"}
                spacing={8}
              >
                <HStack px={3} py={3} rounded={"27px"} bg={"#D9E4EA"} pr={5} boxShadow={"md"}>
                  <Image
                    boxSize="50px"
                    objectFit="cover"
                    src={CellPhoneIcon}
                    alt="Cell Phone Icon"
                  />
                  <Text fontWeight={"400"}>{cardData.telephone}</Text>
                </HStack>
                <HStack px={3} py={3} rounded={"27px"} bg={"#D9E4EA"} pr={5} boxShadow={"md"}>
                  <Image
                    boxSize="50px"
                    objectFit="cover"
                    src={CircledEnvelopeIcon}
                    alt="Circled Envelope Icon"
                  />
                  <Link href={`mailto:${cardData.email}`} fontWeight={"400"}>
                    {cardData.email}
                  </Link>
                </HStack>
                <HStack pl={2} pr={3} py={3} rounded={"27px"} bg={"#D9E4EA"} boxShadow={"md"}>
                  <Image
                    boxSize="50px"
                    objectFit="cover"
                    src={GraduationCapIcon}
                    alt="Graduation Cap Icon"
                  />
                  <Text fontWeight={"400"}>{cardData.academicDegree}</Text>
                </HStack>
              </Stack>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
