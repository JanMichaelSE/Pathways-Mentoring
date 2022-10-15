import { useState, useEffect } from "react";
import {
  HStack,
  SimpleGrid,
  Text,
  Image,
  Spinner,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import { httpGetRecordByUser } from "@/api/records.api";
import { httpGetStudentByMentor } from "@/api/mentors.api";
import RecordCard from "@/components/common/Records/RecordCard/record-card";
import AssignRecordModal from "@/components/Mentors/AssignRecordModal/assign-record-modal";
import NoItemsFound from "@/components/common/NoItemsFound/no-items-found";
import SadFaceIcon from "@/assets/sad-face-icon.svg";
import AddNewIcon from "@/assets/AddNew.png";
import FilterIcon from "@/assets/Filter.png";

import styles from "./mentor-records.module.css";

function MentorRecords() {
  const toast = useToast();
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [sortDescending, setSortDescending] = useState(false);

  useEffect(() => {
    async function loadInitialData() {
      const recordsResponse = await httpGetRecordByUser();
      const studentsResponse = await httpGetStudentByMentor();

      if (recordsResponse.hasError) {
        return toast({
          description: recordsResponse.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }

      if (studentsResponse.hasError) {
        return toast({
          title: "An Error has occured.",
          description:
            "Could not retrieve the students assigned to this mentor. Please try again later.",
          status: "error",
          position: "top",
          duration: "5000",
        });
      }

      const recordsData = recordsResponse.data.sort((a, b) => {
        if (a.createdDate < b.createdDate) {
          return -1;
        }
        if (a.createdDate > b.createdDate) {
          return 1;
        }
        return 0;
      });

      setRecords(recordsData);
      setStudents(studentsResponse.data);
      setIsLoading(false);
    }
    loadInitialData();
  }, []);

  function onSortRecords() {
    records.sort((a, b) => {
      if (a.createdDate < b.createdDate) {
        return -1;
      }
      if (a.createdDate > b.createdDate) {
        return 1;
      }
      return 0;
    });

    if (!sortDescending) {
      records.reverse();
    }

    setRecords(records);
    setSortDescending((prev) => !prev);
  }

  function getSortButtonText() {
    return sortDescending ? "Descending" : "Ascending";
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
      <div
        style={{
          flex: 1,
          backgroundColor: "#f1f8fc",
          height: "92vh",
          paddingTop: "4rem",
        }}
      >
        <HStack justifyContent={"end"} pt={15} mr={50} mb={50}>
          <div className={styles.button} onClick={onOpen}>
            <HStack justifyContent={"center"} alignContent={"center"}>
              <Text>Create</Text>
              <Image src={AddNewIcon} alt="Filter Icon" />
            </HStack>
          </div>
          <div className={styles.lastButton} onClick={onSortRecords}>
            <HStack justifyContent={"center"} alignContent={"center"}>
              <Text>{getSortButtonText()}</Text>
              <Image src={FilterIcon} alt="Filter Icon" />
            </HStack>
          </div>
        </HStack>
        <NoItemsFound title="No records assigned yet" icon={SadFaceIcon} />
        <AssignRecordModal students={students} isOpen={isOpen} onClose={onClose} />
      </div>
    );
  } else {
    return (
      <div style={{ flex: 1, backgroundColor: "#f1f8fc", height: "92vh" }}>
        <HStack justifyContent={"end"} pt={15} mr={50}>
          <div className={styles.button} onClick={onOpen}>
            <HStack justifyContent={"center"} alignContent={"center"}>
              <Text>Create</Text>
              <Image src={AddNewIcon} alt="Filter Icon" />
            </HStack>
          </div>
          <div className={styles.lastButton} onClick={onSortRecords}>
            <HStack justifyContent={"center"} alignContent={"center"}>
              <Text>{getSortButtonText()}</Text>
              <Image src={FilterIcon} alt="Filter Icon" />
            </HStack>
          </div>
        </HStack>
        <SimpleGrid columns={[1, 2, 3]} spacing="40px" className={styles.gridSpace}>
          {records?.map((record) => (
            <RecordCard key={record.id} recordData={record} />
          ))}
        </SimpleGrid>
        <AssignRecordModal students={students} isOpen={isOpen} onClose={onClose} />
      </div>
    );
  }
}

export default MentorRecords;
