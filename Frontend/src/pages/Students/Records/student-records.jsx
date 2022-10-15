import { useState, useEffect } from "react";
import { HStack, SimpleGrid, Text, Image, Spinner, useToast } from "@chakra-ui/react";

import { httpGetRecordByUser } from "@/api/records.api";
import RecordCard from "@/components/common/Records/RecordCard/record-card";
import NoItemsFound from "@/components/common/NoItemsFound/no-items-found";
import SadFaceIcon from "@/assets/sad-face-icon.svg";
import FilterIcon from "@/assets/Filter.png";

import styles from "./student-records.module.css";

function StudentRecords() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [sortDescending, setSortDescending] = useState(false);

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
      setIsLoading(false);
    }
    loadRecords();
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
      <div style={{ flex: 1, backgroundColor: "#f1f8fc", height: "92vh", paddingTop: "4rem" }}>
        <NoItemsFound title="No records assigned yet" icon={SadFaceIcon} />
      </div>
    );
  } else {
    return (
      <div style={{ flex: 1, backgroundColor: "#f1f8fc", height: "92vh" }}>
        <HStack justifyContent={"end"} pt={15}>
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
      </div>
    );
  }
}

export default StudentRecords;
