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

import Record from "../../../components/Mentors/Record/MentorRecord";
import styles from "./mentor-records.module.css";
import NoItemsFound from "@/components/common/NoItemsFound/no-items-found";
import SadFaceIcon from "@/assets/sad-face-icon.svg";
import Select from "@/components/common/Select/select";

function MentorRecords() {
  const toast = useToast();
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

  function clickFunction() {
    buttonFunction(cardData);
  }

  function inputWidth() {
    if (isLessThan950) {
      return "20rem";
    } else {
      if (isLessThan1135) {
        return "14rem";
      } else if (isLessThan1420) {
        return "20rem";
      } else {
        return "75rem";
      }
    }
  }

  let recordData = [
    {
      id: "1",
      name: "Identify Subject",
      date: "6/10/2022",
      student: "Jessica Quintana",
      rating: 100,
    },
    {
      id: "2",
      name: "Research Literature",
      date: "6/15/2022",
      student: "Jessica Quintana",
      rating: 50,
    },
    {
      id: "3",
      name: "Define Methodology",
      date: "6/18/2022",
      student: "Jessica Quintana",
      rating: 50,
    },
    {
      id: "4",
      name: "Run Experiment / Fieldwork",
      date: "6/22/2022",
      student: "Jessica Quintana",
      rating: 5,
    },
    {
      id: "5",
      name: "Gather Data",
      date: "6/25/2022",
      student: "Jessica Quintana",
      rating: 5,
    },
    {
      id: "6",
      name: "Analyze",
      date: "6/30/2022",
      student: "Jessica Quintana",
      rating: 5,
    },
  ];

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
  } else if (recordData.length == 0) {
    return (
      <div style={{ flex: 1, backgroundColor: "#f1f8fc", height: "92vh" }}>
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
        <SimpleGrid
          columns={[1, 2, 3]}
          spacing="40px"
          className={styles.gridSpace}
        >
          {recordData?.map((record) => (
            <Record key={record.id} recordData={record} />
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
              <Center flexDirection={"column"} alignContent={"space-around"} align="stretch">
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      gender: assignableRecord || "Select Option",
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
