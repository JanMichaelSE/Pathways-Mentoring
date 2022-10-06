import React from "react";
import Button from "@/components/common/Button/button";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  Image,
} from "@chakra-ui/react";

import styles from "./mentor-signup-popup.module.css";

function MentorSignUpPopup({ isOpen, onClose }) {
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
          <div>
            <Image
              className={styles.backbtn}
              boxSize="40px"
              objectFit="cover"
              src="/assets/back.svg"
              alt="back.svg"
              onClick={onClose}
              cursor="pointer"
            />
          </div>

          <div className={styles.checkmarkContainer}>
            <Image
              className={styles.checkmarkbtn}
              boxSize={"100px"}
              src="assets/checkmark-icon.svg"
            />
          </div>
        </ModalHeader>
        <ModalBody>
          <p className={styles.message}>
            Your account has been submitted for approval! You'll receive an
            email once its been verified.
          </p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MentorSignUpPopup;
