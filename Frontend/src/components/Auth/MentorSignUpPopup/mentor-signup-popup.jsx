import { useNavigate } from "react-router-dom";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Image } from "@chakra-ui/react";

import CheckmarkIcon from "@/assets/checkmark-icon.svg";

import styles from "./mentor-signup-popup.module.css";

function MentorSignUpPopup({ isOpen, onClose }) {
  const navigate = useNavigate();
  function returnToLogin() {
    onClose();
    navigate("../", { replace: true });
  }
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size={"xl"}
      closeOnOverlayClick={false}
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
            <Image
              className={styles.checkmarkBtn}
              boxSize={"100px"}
              src={CheckmarkIcon}
              alt="Checkmark Icon"
            />
          </div>
          <div>
            <p className={styles.message}>
              Your account has been submitted for approval! You'll receive an email once its been
              verified.
            </p>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className={styles.btnContainer}>
            <button onClick={returnToLogin} className={styles.btn}>
              Back
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MentorSignUpPopup;
