import {
  HStack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spacer,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { httpAssignRecords } from "@/api/records.api";
import Select from "@/components/common/Select/select";
import Button from "@/components/common/Button/button";

import styles from "./assign-record-modal.module.css";

function AssignRecordModal({ students, isOpen, onClose }) {
  const toast = useToast();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  async function submitRecordAssignment(studentId) {
    const response = await httpAssignRecords(studentId);

    if (response.hasError) {
      return toast({
        title: "An Error has occured.",
        description: "Could not assign records to student. Please ty again later.",
        status: "error",
        position: "top",
        duration: "5000",
      });
    }

    toast({
      title: "Successfully Assigned Records to Students!",
      status: "success",
      position: "top",
      duration: "5000",
    });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={isLargerThan768 ? "4xl" : "md"} rounded={"27px"}>
      <ModalOverlay />
      <ModalContent className={styles.modalContent}>
        <ModalHeader>
          <HStack alignItems={"center"}>
            <Image
              boxSize="40px"
              objectFit="cover"
              src="/assets/back.svg"
              alt="back.svg"
              onClick={onClose}
              cursor="pointer"
            />
            <Spacer />
          </HStack>
        </ModalHeader>
        <ModalBody className={styles.modalBody}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              studentName: "",
            }}
            validationSchema={Yup.object({
              studentName: Yup.string().required("A student is required to assign records."),
            })}
            onSubmit={async (values) => {
              await submitRecordAssignment(values.studentName);
            }}
          >
            <Form className={styles.form}>
              <div className={styles.inputContainer}>
                <Select
                  label="Record to be assigned"
                  name="studentName"
                  style={{ width: "30rem" }}
                  isBlue={true}
                >
                  <option value="">Select Option</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name.replace(";", "")}
                    </option>
                  ))}
                </Select>
              </div>
              <div className={styles.modalButton}>
                <Button style={{ float: "none" }}>Assign Record</Button>
              </div>
            </Form>
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AssignRecordModal;
