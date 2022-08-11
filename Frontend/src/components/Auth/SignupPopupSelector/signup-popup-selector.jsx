import { Link } from "react-router-dom";
import styles from "./signup-popup-selector.module.css";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Image,
  Button,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useMediaQuery,
  HStack,
  Spacer,
  StylesProvider,
} from "@chakra-ui/react";

function SignupPopupSelector() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button className={styles.linkButton} onClick={onOpen}>
        Create an account.
      </button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent
          borderRadius={"60px"}
          borderWidth={"2px"}
          borderStyle={"dashed"}
          borderColor={"#0066CC"}
        >
          <ModalHeader>
            <HStack alignItems={"center"} spacing="100px">
              <Image
                boxSize="40px"
                objectFit="cover"
                src="/assets/back.svg"
                alt="back.svg"
                onClick={onClose}
                cursor="pointer"
              />
              <h1 style={{ fontWeight: 600, fontSize: "36px" }}>Select Role</h1>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <div className={styles.buttonContainer}>
              <Link className={styles.linkLogo} to={"/signup?role=mentor"}>
                <img src="/assets/select-mentor-logo.svg"></img>
              </Link>
              <Link className={styles.linkLogo} to={"/signup?role=student"}>
                <img src="/assets/select-student-logo.svg"></img>
              </Link>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignupPopupSelector;
