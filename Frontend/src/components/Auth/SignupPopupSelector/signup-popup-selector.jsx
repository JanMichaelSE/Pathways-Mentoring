import { Link } from "react-router-dom";
import BackIcon from "@/assets/back.svg";
import SelectMentorIcon from "@/assets/select-mentor-logo.svg";
import SelectStudentIcon from "@/assets/select-student-logo.svg";

import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";

import styles from "./signup-popup-selector.module.css";

function SignupPopupSelector() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button className={styles.linkButton} onClick={onOpen}>
        Create an account.
      </button>
      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom" size={"xl"}>
        <ModalOverlay />
        <ModalContent
          borderRadius={"60px"}
          borderWidth={"2px"}
          borderStyle={"dashed"}
          borderColor={"#0066CC"}
        >
          <ModalHeader>
            <HStack alignItems={"center"} spacing="130px">
              <Image
                boxSize="40px"
                objectFit="cover"
                src={BackIcon}
                alt="Back Icon"
                onClick={onClose}
                cursor="pointer"
              />
              <h1 style={{ fontWeight: 600, fontSize: "36px" }}>Select Role</h1>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <div className={styles.buttonContainer}>
              <Link className={styles.linkLogo} to={"/signup?role=mentor"}>
                <img src={SelectMentorIcon} alt="Select Mentor Icon"></img>
              </Link>
              <Link className={styles.linkLogo} to={"/signup?role=student"}>
                <img src={SelectStudentIcon} alt="Select Student Icon"></img>
              </Link>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignupPopupSelector;
