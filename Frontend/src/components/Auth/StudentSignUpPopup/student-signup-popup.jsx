import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
} from "@chakra-ui/react";

import styles from "./student-signup-popup.module.css";
function StudentSignUpPopup({ isOpen, onClose }) {
  return (
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
          <div className={styles.checkmarkContainer}>
            <Image boxSize={"100px"} src="assets/checkmark-icon.svg" />
          </div>
        </ModalHeader>
        <ModalBody>Hola</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default StudentSignUpPopup;
