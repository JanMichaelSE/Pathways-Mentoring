import React, { Fragment, useState, useEffect } from "react";
import {
  HStack,
  SimpleGrid,
  Text,
  Image,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import StudentRecord from "../../../components/Students/Record/StudentRecord";
import styles from "./student-records.module.css";
import NoItemsFound from "@/components/common/NoItemsFound/no-items-found";
import SadFaceIcon from "@/assets/sad-face-icon.svg";

function StudentRecords() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);
  const [filterOption, setFilterOption] = useState("none");
    let recordData =  [
        {"id": "1","name": "Identify Subject", "date": "6/10/2022","profesor": "Jan Montalvo", "rating": 100},
        {"id": "2","name": "Research Literature", "date": "6/15/2022","profesor": "Jan Montalvo", "rating": 50}, 
        {"id": "3","name": "Define Methodology", "date": "6/18/2022","profesor": "Jan Montalvo", "rating": 50},
        {"id": "4","name": "Run Experiment / Fieldwork", "date": "6/22/2022","profesor": "Jan Montalvo", "rating": 5},
        {"id": "5","name": "Gather Data", "date": "6/25/2022", "profesor": "Jan Montalvo", "rating": 5},
        {"id": "6","name": "Analyze", "date": "6/30/2022", "profesor": "Jan Montalvo", "rating": 5},
    ]

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
        <div style={{ flex: 1, backgroundColor: "#f1f8fc", height: "92vh",}}>
        <NoItemsFound
          title="No records assigned yet"
          icon={SadFaceIcon}
        />
        </div>
      );
    } else {
      return (
    <div style={{flex: 1, backgroundColor: "#f1f8fc", height: "92vh"}}>
      <HStack justifyContent={"end"} pt={15}>
        <div className={styles.lastButton}>
          <HStack justifyContent={"center"} alignContent={"center"}>
            <Text>
              Filter
            </Text>
            <Image src='../../assets/Filter.png' alt='Filter Icon' />
          </HStack>
        </div>
      </HStack>
      <SimpleGrid columns={[1, 2, 3]} spacing='40px' className={styles.gridSpace}>
      {
        recordData?.map((record) => (
          <StudentRecord key={record.id} recordData={record}/>
        ))
      }
      
      </SimpleGrid>
    </div>
  );}
}

export default StudentRecords;