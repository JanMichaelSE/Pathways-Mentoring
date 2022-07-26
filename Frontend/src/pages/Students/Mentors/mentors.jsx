import React from "react";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Link,
  useColorModeValue,
  Flex,
  Image,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";

import { useMediaQuery } from "@chakra-ui/react";

function Mentors() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Flex direction={isLargerThan768 ? "row" : "column-reverse"}>
        <Spacer />
        <Center onClick={onOpen} py={6}>
          <Box
            px={12}
            maxW={"320px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
          >
            <Avatar
              size={"xl"}
              src={"/assets/Jessica.svg"}
              alt={"Avatar Alt"}
              mb={4}
              pos={"relative"}
            />
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              Jessica Quintana
            </Heading>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
              CS/COE
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

        <Spacer />

        <Center onClick={onOpen} py={6}>
          <Box
            px={12}
            maxW={"320px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
          >
            <Avatar
              size={"xl"}
              src={"/assets/Zayira.svg"}
              alt={"Avatar Alt"}
              mb={4}
              pos={"relative"}
            />
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              Zayira Jordan
            </Heading>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
              CS/COE
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

        <Spacer />
        <Center onClick={onOpen} py={6}>
          <Box
            px={12}
            maxW={"320px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
          >
            <Avatar
              size={"xl"}
              src={"/assets/Jan.svg"}
              alt={"Avatar Alt"}
              mb={4}
              pos={"relative"}
            />
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              Jan Montalvo
            </Heading>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
              CS/COE
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
        <Spacer />
      </Flex>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Center>
              <Stack align={"center"} justify={"center"} mt={6}>
                <Avatar
                  size={"xl"}
                  src={"/assets/Jan.svg"}
                  alt={"Avatar Alt"}
                  mb={4}
                  pos={"relative"}
                />
                <Heading fontSize={"2xl"} fontFamily={"body"}>
                  Jan Montalvo
                </Heading>
                <Text fontWeight={600} color={"gray.500"}>
                  CS/COE
                </Text>
              </Stack>
            </Center>
            <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            <Badge
            px={5}
            py={5}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            787-710-1074
          </Badge>
          <Badge
            px={5}
            py={5}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            jmontalvo.dev@gmail.com
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            BSc
          </Badge>
            </Stack>
            <Stack>
            <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            {/* Will only accept calls on fridays at work. If need of any other information please contact me by email. In any case I am available on Monday and Friday from 12:00 PM to 4:00 PM.  */}
          </Badge>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Mentors;
