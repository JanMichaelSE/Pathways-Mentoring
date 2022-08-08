import styles from "./forgotpwd-lojin-popup.module.css";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Image,
  Button,
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

function ForgotPwdLoginPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button className={styles.linkButton} onClick={onOpen}>
        Forgot password?
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
          <ModalHeader>Forgot Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Hola</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ForgotPwdLoginPopup;
