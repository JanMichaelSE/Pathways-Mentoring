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
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent borderRadius={"60px"}>
          <ModalHeader>Select Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className={styles.buttonContainer}>
              <Link to={"/signup"}>
                <img src="/assets/Avatars.png"></img>
              </Link>
              <Link to={"/signup"}>
                <img src="/assets/Avatars.png"></img>
              </Link>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignupPopupSelector;
