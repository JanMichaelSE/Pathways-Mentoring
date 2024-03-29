import { useNavigate } from "react-router-dom";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Image } from "@chakra-ui/react";

import CheckmarkIcon from "@/assets/checkmark-icon.svg";

import styles from "./student-signup-popup.module.css";

function StudentSignUpPopup({ isOpen, onClose }) {
  const navigate = useNavigate();

  function proceedApp() {
    onClose();
    navigate("../student/assessments", { replace: true });
  }

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size={"3xl"}
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
            <Image boxSize={"100px"} src={CheckmarkIcon} alt="Checkmark Icon" />
          </div>
          <div>
            <h1 className={styles.headerMessage}>Your account has been created!</h1>
            <p className={styles.message}>
              Please click continue where you'll have the opportunity to fill out an assessment.
            </p>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className={styles.btnContainer}>
            <button onClick={proceedApp} className={styles.btn}>
              Continue
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default StudentSignUpPopup;
