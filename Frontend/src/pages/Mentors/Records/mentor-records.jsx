import React, { Fragment, useState, useEffect } from "react";
import {
  Box,
  HStack,
  SimpleGrid,
  Text,
  Image,
  Spinner,
  useToast,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  useMediaQuery,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { httpGetRecordByUser } from "@/api/records.api";
import RecordCard from "@/components/common/Records/RecordCard/record-card";
import NoItemsFound from "@/components/common/NoItemsFound/no-items-found";
import SadFaceIcon from "@/assets/sad-face-icon.svg";
import Select from "@/components/common/Select/select";

import styles from "./mentor-records.module.css";

function MentorRecords() {
  // This request for Record could be a Reusable Hook in the Future
  const toast = useToast();
  const [records, setRecords] = useState([]);
  const [assignableRecord, setAssignableRecord] = useState({});
  const [edit, setEdit] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [isLessThan950] = useMediaQuery("(max-width: 950px)");
  const [isLessThan1135] = useMediaQuery("(max-width: 1135px)");
  const [isLessThan1420] = useMediaQuery("(max-width: 1420px)");
  const [sortAscending, setSortAscending] = useState(true);
  const [filterOption, setFilterOption] = useState("none");

  useEffect(() => {
    async function loadRecords() {
      const recordsResponse = await httpGetRecordByUser();

      if (recordsResponse.hasError) {
        return toast({
          description: recordsResponse.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }

      setRecords(recordsResponse.data);
      setIsLoading(false);
    }
    loadRecords();
  }, []);

  function clickFunction() {
    buttonFunction(cardData);
  }

  function inputWidth() {
    if (isLessThan950) {
      return "40rem";
    } else {
      if (isLessThan1135) {
        return "40rem";
      } else if (isLessThan1420) {
        return "40rem";
      } else {
        return "50rem";
      }
    }
  }

  if (isLoading) {
    return (
      <div style={{ flex: 1, backgroundColor: "#f1f8fc", height: "92vh" }}>
        <Spinner
          thickness="5px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          position="absolute"
          top="30%"
          left="50%"
        />
      </div>
    );
  } else if (records.length == 0) {
    return (
      <div style={{ flex: 1, backgroundColor: "#f1f8fc", height: "92vh", marginTop: "4rem" }}>
        <NoItemsFound title="No records assigned yet" icon={SadFaceIcon} />
      </div>
    );
  } else {
    return (
      <div style={{ flex: 1, backgroundColor: "#f1f8fc", height: "92vh" }}>
        <HStack justifyContent={"end"} pt={15} mr={50}>
          <div className={styles.button} onClick={onOpen}>
            <HStack justifyContent={"center"} alignContent={"center"}>
              <Text>Create</Text>
              <Image src="../../assets/AddNew.png" alt="Filter Icon" />
            </HStack>
          </div>
          <div className={styles.lastButton}>
            <HStack justifyContent={"center"} alignContent={"center"}>
              <Text>Filter</Text>
              <Image src="../../assets/Filter.png" alt="Filter Icon" />
            </HStack>
          </div>
        </HStack>
        <SimpleGrid columns={[1, 2, 3]} spacing="40px" className={styles.gridSpace}>
          {records?.map((record) => (
            <RecordCard key={record.id} recordData={record} />
          ))}
        </SimpleGrid>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          size={isLargerThan768 ? "4xl" : "md"}
          rounded={"27px"}
        >
          <ModalOverlay />
          <ModalContent
            borderWidth={"2px"}
            borderStyle={"dashed"}
            borderColor={"#0066CC"}
          >
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
            <ModalBody pb={6}>
              <Center flexDirection={"column"} justifyContent={"space-between"} >
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      record: assignableRecord || "Select Option",
                    }}
                    validationSchema={Yup.object({})}
                    onSubmit={async (values) => {
                      await handleSubmit(values);
                    }}
                  >
                    <Select
                      label="Record to be assigned"
                      name="record"
                      style={{ width: inputWidth() }}
                      disabled={edit}
                      isBlue={true}
                    >
                      <option value="">Select Option</option>
                    </Select>
                  </Formik>
                  <div className={styles.modalButton}>
                    <HStack justifyContent={"center"}>
                      <Text>Assign Record</Text>
                    </HStack>
                  </div>

              </Center>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    );
  }
}

export default MentorRecords;
